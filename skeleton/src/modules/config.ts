import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv"

dotenv.config()


const configClass  = new S3Client({
  region : process.env.REGION as string,
  credentials : {
    accessKeyId : process.env.ACCESS_KEY as string,
    secretAccessKey : process.env.SECRET_KEY as string
  },
})

export default configClass