import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import configClass from "./modules/configClass";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

interface IContainer {
  _id: string;
  img: string;
  src: string;
  description: string;
  genre: string;
}

const listFilesInBucket = async (bucketName: string) => {
  try {
    const params = {
      Bucket: bucketName,
    };

    const command = new ListObjectsV2Command(params);
    const data = await configClass.send(command);

    const result: IContainer[] = [];

    data.Contents?.forEach((item) => {
      const fileContainer: IContainer = {
        _id: "",
        img: "",
        src: "",
        description: "",
        genre: "",
      };

      if (item.Key) {
        const fileName = item.Key.split(".")[0]; // 파일 이름만 추출
        const extension = item.Key.split(".")[1];
        const url = `https://${bucketName}.s3.amazonaws.com/${encodeURIComponent(item.Key)}`;
        fileContainer._id = fileName
        if (extension === "mp3") {
          fileContainer.src = url;
        } else {
          fileContainer.img = url;
        }
        result.push(fileContainer)
      }
    });

    const jsonOutput = JSON.stringify(result, null, 2);
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
