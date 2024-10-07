import reNameFile from "./modules/reNameFile";
import configClass from "./modules/configClass";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// reNameFile("../../music/오브")

dotenv.config();

const uploadFileToS3 = async (filePath: string) => {
  console.log(process.env.BUCKET_NAME);
  try {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fileStream,
      ContentType: filePath.split(".")[1] === "mp3" ? "audio/mp3" : "image/webp",
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
        // 파일이면 업로드
        await uploadFileToS3(filePath);
      } else if (stat.isDirectory()) {
        // 디렉토리이면 재귀적으로 하위 디렉토리 탐색
        await uploadDirectoryToS3(filePath);
      }
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

const directoryPath = path.join(__dirname, "../music");
uploadDirectoryToS3(directoryPath);
