import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import configClass from "./modules/configClass";
import fs from "fs"

import dotenv from "dotenv";


dotenv.config();


const listFilesInBucket = async (bucketName: string) => {
  try {
    const params = {
      Bucket: bucketName,
    };

    const command = new ListObjectsV2Command(params);
    const data = await configClass.send(command);

    const files: { [key: string]: string } = {}; // 파일 이름을 key로, URL을 value로 가지는 객체

    data.Contents?.forEach((item) => {
      if (item.Key) {
        const fileName = item.Key.split(".")[0]// 파일 이름만 추출
        const url = `https://${bucketName}.s3.amazonaws.com/${encodeURIComponent(item.Key)}`;
        if (fileName) {
          files[fileName] = url;
        }
      }
    });

    const jsonOutput = JSON.stringify(files, null, 2);
    console.log(jsonOutput);

    // JSON 데이터를 파일로 기록하기 (비동기 방식)
    const filePath = "./output.json"; // 저장할 파일 경로
    fs.writeFile(filePath, jsonOutput, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File has been saved successfully!");
      }
    });

    return jsonOutput;

  } catch (err) {
    console.error("Error listing objects in bucket:", err);
  }
};

const bucketName = process.env.BUCKET_NAME as string;
listFilesInBucket(bucketName);