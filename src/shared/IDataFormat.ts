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
  id: string;
  requestLog: string;
  date: string;
}

export interface IRequestDataFormatServer extends IRequestDataFormat, Document {
  id: string;
}

export interface IMailTimestemp{
  id : string;
  sentTime : Date;
  status : string
}

export interface IMailTimestempServer extends IMailTimestemp, Document{
  id : string;
}