import { Document } from "mongoose";

export interface IMusicDataFormat {
  _id: string;
  src: string;
  img: string;
  description: {
    headLine: string;
    mainScript: string;
  };
  genre: string;
}

export interface IMusicDataFormatServer extends IMusicDataFormat, Document {
  _id: string;
}

export interface IRequestDataFormat {
  _id: string;
  requestLog: string;
  date: string;
}

export interface IRequestDataFormatServer extends IRequestDataFormat, Document {
  _id: string;
}

export interface IMailTimestemp{
  _id : string;
  sentTime : Date;
  status : string
}

export interface IMailTimestempServer extends IMailTimestemp, Document{
  _id : string;
}