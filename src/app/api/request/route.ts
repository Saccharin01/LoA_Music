export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { InitalizeServerENV, LogMailEvent, fetchLastEmailEvent } from "../modules/InitalizeServerENV";
import connectDB from "../modules/ConnectDB";
import { RequestLog, MailTimestemp } from "../model/mongooseModel";
import { IRequestDataFormat } from "@/shared/IDataFormat";
import { getDate, numberdId, validateRequestData } from "../modules/RequestFormat";
import MailNotification from "../modules/MailNotification";

const REQUEST_THRESHOLD = 10;

// 서버 초기화 시 이니셜라이즈 함수 실행
InitalizeServerENV(RequestLog, MailTimestemp);

export async function POST(request: Request) {
  console.log(globalThis.cache);
  console.log(globalThis.Memo);
  try {
    await connectDB(); // 각 요청마다 데이터베이스 연결 상태 확인

    const body: IRequestDataFormat = await request.json();
    validateRequestData(body.requestLog); // 요청 데이터 검증

    const lastRequest = await RequestLog.findOne().sort({ _id: -1 }).exec();
    const newId = numberdId(lastRequest);

    const newRequestLog = new RequestLog({
      _id: newId,
      requestLog: body.requestLog,
      date: getDate(new Date()),
    });

    await newRequestLog.save();

    // 클라이언트에 즉시 응답 반환
    const response = NextResponse.json(
      { message: "Data saved successfully", data: newRequestLog },
      { status: 201 }
    );

    // 메일 검증 및 전송은 비동기적으로 처리
    processMailVerification(newId);

    // 응답을 즉시 반환하고 이후 작업을 비동기 처리
    return response;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Request error:", error);
    return NextResponse.json(
      {
        error: "Error saving data",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// 비동기적으로 메일 검증 및 전송을 수행하는 함수
async function processMailVerification(newId: string) {
  try {
    const numericCurrentId = parseInt(newId.split(".")[1], 10);
    const idDifference = numericCurrentId - globalThis.Memo;

    if (idDifference >= REQUEST_THRESHOLD) {
      const emailType = "request_threshold_exceeded";
      const currentDate = new Date();
      const currentDay = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜 가져오기

      const cachedData = globalThis.cache.get("lastEmailEvent");

      // 캐시에 저장된 날짜의 일(day) 값이 같으면 메일을 전송하지 않음
      if (cachedData && cachedData.sentTime.toISOString().split('T')[0] === currentDay) {
        console.log(`오늘 이미 메일이 전송되었으므로 메일 전송이 생략되었습니다.`);
      } else {
        const lastEmailEvent = await fetchLastEmailEvent(MailTimestemp);
        const lastEventDay = lastEmailEvent ? lastEmailEvent.sentTime.toISOString().split('T')[0] : null;

        // 데이터베이스에 기록된 마지막 메일 전송 일자가 오늘과 같으면 메일 전송 생략
        if (lastEventDay === currentDay) {
          console.log(`데이터베이스 기록에 따라 오늘은 이미 메일이 전송되었습니다.`);
        } else {
          // 메일 전송 로직 실행
          await MailNotification(idDifference);

          // 캐시 갱신
          globalThis.cache.set("lastEmailEvent", { _id: "uniqueId", sentTime: new Date(), status: "sent" });

          const MailLogID = await MailTimestemp.findOne().sort({ _id: -1 }).exec();
          await LogMailEvent(
            {
              _id: numberdId(MailLogID),
              sentTime: new Date(),
              status: "sent",
            },
            MailTimestemp
          );

          console.log("메일 전송 및 로그 기록 완료");
        }
      }

      // 최신 Memo 업데이트
      globalThis.Memo = numericCurrentId;
    }
  } catch (error) {
    console.error("Error processing mail verification:", error);
  }
}
