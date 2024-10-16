import { Document } from "mongoose";
import validator from 'validator';


export function getDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`; //
}



export function numberdId(doc: Document): string {
  const lastNumber = doc && doc.id 
    ? parseInt(doc.id.toString().split(".")[1]) 
    : 0;
  const newNumber = lastNumber + 1;
  const newId = `No.${newNumber.toString().padStart(4, "0")}`; 
  
  return newId; 
}


export function validateRequestData(requestData: string): void {
  if (!validator.isLength(requestData, { min: 1, max: 100 })) {
    throw new Error('글자 수는 100글자를 넘어가면 안됩니다.');
  }

  if (validator.contains(requestData, '<') || validator.contains(requestData, '>')) {
    throw new Error('허용되지 않은 특수문자가 포함되어 있습니다.');
  }
}
