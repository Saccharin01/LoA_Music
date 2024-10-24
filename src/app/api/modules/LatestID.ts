import { Model } from "mongoose";
import { IRequestDataFormatServer } from "@/shared/IDataFormat";

export async function LatestID(model: Model<IRequestDataFormatServer>): Promise<number> {
  try {
    const lastRequest = await model.findOne().sort({ id: -1 }).exec();
    const latestId = lastRequest ? parseInt(lastRequest.id.split('.')[1], 10) : 0;
    console.log(`서버 시작 시 최신 id 숫자 값 로드 완료: ${latestId}`);
    return latestId;
  } catch (error) {
    console.error('최신 id 로드 오류:', error);
    return 0; // 오류 발생 시 기본값 0 반환
  }
}
