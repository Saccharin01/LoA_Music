import connectDB from "./ConnectDB";
import { LatestID } from "./LatestID";
import { Model } from "mongoose";
import { IRequestDataFormatServer, IMailTimestempServer, IMailTimestemp } from "@/shared/IDataFormat";
import { LRUCache } from "@/shared/LRU.Class";

export async function InitalizeServerENV(
  requestModel: Model<IRequestDataFormatServer>, 
  mailModel: Model<IMailTimestempServer>
): Promise<void> {
  try {
    await connectDB();
    const newestID = await LatestID(requestModel);
    globalThis.Memo = newestID;

    console.log(`Newest Doc's _id value : ${newestID}`);

    if (!globalThis.cache) {
      globalThis.cache = new LRUCache<string, IMailTimestemp>(10); 
      console.log('LRUCache가 성공적으로 초기화되었습니다.');
    }

    const lastEmailEvent = await fetchLastEmailEvent(mailModel);

    if (lastEmailEvent) {
      globalThis.cache.set("lastEmailEvent", lastEmailEvent);
      console.log(`캐시 초기화 완료: 메일 이벤트가 로드되었습니다.`);
    }
  } catch (error) {
    console.error("서버 시작 시 초기화 오류:", error);
  }
}

export async function fetchLastEmailEvent(
  model: Model<IMailTimestempServer>
): Promise<IMailTimestempServer | null> {
  try {
    const lastEvent = await model.findOne().sort({ sentTime: -1 }).exec();
    return lastEvent;
  } catch (error) {
    console.error("Error fetching last email event:", error);
    return null;
  }
}

export async function LogMailEvent(
  object: IMailTimestemp,
  model: Model<IMailTimestempServer>
): Promise<void> {
  try {
    const newEvent = new model({
      ...object,
      sentTime: object.sentTime,
      status: object.status,
    });

    await newEvent.save();
    console.log(`메일 전송 이벤트가 데이터베이스에 저장되었습니다.`);
  } catch (error) {
    console.error("Error saving mail event to database:", error);
  }
}
