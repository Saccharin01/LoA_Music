import { Document } from "mongoose"

export default interface MusicData extends Document {
  _id : string,
  src : string
}

