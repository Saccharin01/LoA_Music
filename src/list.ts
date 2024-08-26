import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import configClass from "./modules/config";
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
    return jsonOutput;

  } catch (err) {
    console.error("Error listing objects in bucket:", err);
  }
};

const bucketName = process.env.BUCKET_NAME as string;
listFilesInBucket(bucketName);