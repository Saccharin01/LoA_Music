import mongoose, { Schema, models } from "mongoose";
import { IMusicDataFormatServer, IRequestDataFormatServer} from "@/shared/IDataFromat";

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

const MusicData = models.MusicData||mongoose.model<IMusicDataFormatServer>("MusicData", musicSchema, "MusicData");
const RequestLog = models.request||mongoose.model<IRequestDataFormatServer>("request", requestSchema, "request");

export { MusicData, RequestLog };
