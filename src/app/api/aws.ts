import reNameFile from "./modules/reNameFile";
import configClass from "./modules/configClass";
import { PutObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"


reNameFile("@shared/music")



dotenv.config()

const uploadFileToS3 = async (filePath : string) => {
  console.log(process.env.BUCKET_NAME)
  try {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
      ContentType: 'audio/mp3'
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await configClass.send(command);
    console.log(`File uploaded successfully. ${response}`);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
};

const uploadDirectoryToS3 = async (directoryPath: string) => {
  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isFile()) {
        await uploadFileToS3(filePath);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

const directoryPath = path.join(__dirname, "../static/music");
uploadDirectoryToS3(directoryPath);