import mongoose, { Schema, models } from "mongoose";
import { IMusicDataFormatServer, IRequestDataFormatServer, IMailTimestempServer} from "@/shared/IDataFormat";

/**
 * NoSQL에서 사용하는 스키마와 모델을 정의하는 파일입니다.
 * 각 모델은 각각의 스키마와 연결 되어있고, 각각의 스키마는 인터페이스를 통해 형식을 지정했습니다.
 */

const musicSchema: Schema<IMusicDataFormatServer> = new Schema({
  _id: String,
  src: String,
  img: String,
  description: {
    headLine: String,
    mainScript: String,
  },
});

const requestSchema : Schema<IRequestDataFormatServer> = new Schema({
  _id : String,
  requestLog : String,
  date : String
})

const mailSchema : Schema<IMailTimestempServer> = new Schema({
  _id : String,
  sentTime : Date,
  status : String
})

const MusicData = models.MusicData||mongoose.model<IMusicDataFormatServer>("MusicData", musicSchema, "MusicData");
const RequestLog = models.request||mongoose.model<IRequestDataFormatServer>("request", requestSchema, "request");
const MailTimestemp = models.MailTimestemp||mongoose.model<IMailTimestempServer>("mailTimestemp", mailSchema, "mailTimestemp");

export { MusicData, RequestLog, MailTimestemp };
