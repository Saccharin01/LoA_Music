export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { InitalizeServerENV, LogMailEvent } from "../modules/InitalizeServerENV";
import connectDB from "../modules/ConnectDB";
import { RequestLog, MailTimestemp } from "../model/mongooseModel";
import { IRequestDataFormat } from "@/shared/IDataFormat";
import { getDate, numberdId, validateRequestData} from "../modules/RequestFormat";
import MailNotification from "../modules/MailNotification";

const REQUEST_THRESHOLD = 10;

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

    const numericCurrentId = parseInt(newId.split(".")[1], 10);
    const idDifference = numericCurrentId - globalThis.Memo;

    if (idDifference >= REQUEST_THRESHOLD) {
      try {
        // 메일 전송 시도
        MailNotification(idDifference);
        const MailLogID = await MailTimestemp.findOne().sort({ _id: -1 }).exec();
        // 메일이 성공적으로 전송된 경우에만 메일 이벤트를 로그로 기록
        await LogMailEvent(
          {
            _id: numberdId(MailLogID),
            sentTime: new Date(),
            status: "sent",
          },

          MailTimestemp
        );

        console.log("메일 전송 및 로그 기록 완료");
      } catch (error) {
        console.error("Error sending email:", error);
      }

      globalThis.Memo = numericCurrentId; // 최신 ID 업데이트
    }

    return NextResponse.json(
      { message: "Data saved successfully", data: newRequestLog },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
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
