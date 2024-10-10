export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { initializeLatestId } from "../modules/initializeLatestId";
import connectDB from "../modules/ConnectDB";
import { RequestLog } from "../model/mongooseModel";
import { IRequestDataFormat } from "@/shared/IDataFromat";
import { getDate, numberdId, validateRequestData } from "../modules/RequestFormat";
import MailNotification from "../modules/MailNotification";

let Memo = 0; 
const REQUEST_THRESHOLD = 10; 

export async function POST(request: Request) {

  console.log(process.env.EMAIL_USER)
  console.log(process.env.EMAIL_PASS)
  try {
    await connectDB(); 
    if (Memo === 0) {
      initializeLatestId(RequestLog)
        .then((latestId : number) => {
          Memo = latestId;
        })
        .catch((error : Error) => {
          console.error("최신 _id 초기화 오류:", error);
        });
    }
    
    const body: IRequestDataFormat = await request.json();

    validateRequestData(body.requestLog);


    const lastRequest = await RequestLog.findOne().sort({ _id: -1 }).exec();
    const newId = numberdId(lastRequest);

    const newRequestLog = new RequestLog({
      _id: newId,
      requestLog: body.requestLog,
      date: getDate(new Date()),
    });

    await newRequestLog.save();

    const numericCurrentId = parseInt(newId.split(".")[1], 10);
    const idDifference = numericCurrentId - Memo;

    if (idDifference >= REQUEST_THRESHOLD) {
      MailNotification(idDifference).catch((error : Error) => {
        console.error("Error sending email:", error);
      });
      // todo 배포 전에 실행 시킬 것 !!!! 
      // Memo = numericCurrentId;
    }

    return NextResponse.json(
      { message: "Data saved successfully", data: newRequestLog },
      { status: 201 }
    );
  } catch (error) {
    // 외부 try-catch 블록에서 모든 예외 처리
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
