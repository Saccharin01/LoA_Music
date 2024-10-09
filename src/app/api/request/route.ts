import { NextResponse } from "next/server";
import connectDB from "../modules/ConnectDB";
import { RequestLog } from "../model/mongooseModel";
import { IRequestDataFormat } from "@/shared/IDataFromat";
import { getDate, numberdId, validateRequestData } from "../modules/RequestFormat";

export async function POST(request: Request) {
  try {
    const body: IRequestDataFormat = await request.json();
    await connectDB();

    const isValid = validateRequestData(body.requestLog);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid input data. Please check your request log." },
        { status: 400 }
      );
    }

    const lastRequest = await RequestLog.findOne().sort({ _id: -1 }).exec();
    const newId = numberdId(lastRequest);

    const newRequestLog = new RequestLog({
      _id: newId,
      requestLog: body.requestLog,
      date: getDate(new Date()),
    });

    await newRequestLog.save();

    return NextResponse.json(
      { message: "Data saved successfully", data: newRequestLog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json(
      {
        error: "Error saving data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
