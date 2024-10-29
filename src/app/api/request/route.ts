export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { InitalizeServerENV } from "../modules/InitalizeServerENV";
import connectDB from "../modules/ConnectDB";
import { RequestLog, MailTimestemp } from "../model/mongooseModel";
import { IRequestDataFormat } from "@/shared/IDataFormat";
import { getDate, numberdId, validateRequestData } from "../modules/RequestFormat";
import { MailVerification } from "../modules/MailVerification"

// ? N회 이상 일 때 메일이 전송되는 쓰레스홀드입니다.
//* MailVerification함수에서 두 번째 매개변수로 요구되는 값이며 미 지정시 10으로 기본 값이 설정되어 있습니다.

const REQUEST_THRESHOLD = 10;

/**
 * ! 서버의 환경을 초기화하는 함수입니다.
 * route.ts 파일을 통해 라우팅 POST API 요청이 트리거 되면 해당 함수가 가장 먼저 실행되어 서버의 환경을 초기화 합니다.
 * 사용자의 경험을 위해 논블럭 비동기 처리가 되어있습니다.
 */

InitalizeServerENV(RequestLog, MailTimestemp);

export async function POST(request: Request) {
  console.log(globalThis.cache);
  console.log(globalThis.Memo);
  try {
    await connectDB(); // 각 요청마다 데이터베이스 연결 상태 확인 연결이 되어있으면 패스쓰루, 연결이 안 되어있으면 연결을 진행합니다.

    const body: IRequestDataFormat = await request.json();
    validateRequestData(body.requestLog); // 요청 데이터 검증

    const lastRequest = await RequestLog.findOne().sort({ id: -1 }).exec();
    const newId = numberdId(lastRequest);

    const newRequestLog = new RequestLog({
      id: newId,
      requestLog: body.requestLog,
      requestParams: body.requestParams,
      date: getDate(new Date()),
    });

    await newRequestLog.save();

    // 정상적으로 요청이 전송되었다면 메일 전송 로직을 기다리지 않고 사용자에게 응답을 반환합니다.
    const response = NextResponse.json(
      { message: "Data saved successfully", data: newRequestLog },
      { status: 201 }
    );

    // 메일 검증 및 전송은 비동기적으로 처
    MailVerification(newId , REQUEST_THRESHOLD);

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