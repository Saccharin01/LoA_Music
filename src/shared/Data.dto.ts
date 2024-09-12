import { Document } from "mongoose"

export default interface DataFormat {
  _id : string,
  src : string,
  kr_name : string,
  thumbnail : string,
  description : string
}


export default interface MusicData extends Document {
  _id : string,
  src : string
}

