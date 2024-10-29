import { Document } from "mongoose";
import validator from 'validator';

/**
 * 날짜값을 생성하는 함수입니다
 * YYYY-MM-DD 형식으로 깔끔하게 문자열로 잘라내고 싶어 작성한 함수입니다.
 * @param date Date 인스턴스 값을 요구합니다. new Date() 에서 반환하는 형식과 동일합니다.
 * @returns YYYY-MM-DD 형식으로 포메팅 된 문자열이 반환됩니다.
 */

export function getDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`; //
}

/**
 * 데이터베이스에 저장되어있는 문서의 id 필드의 값을 가져와 넘버링 하는 함수입니다.
 * 데이터베이스에는 No.nnnn 형식으로 문자열로 처리되어 저장되고 있으나, 서버에서는 해당 값을 조회해 int로 변경한 다음 +1 수식을 이용해 수를 늘려
 * 넘버링 하고 있습니다.
 * 
 * @param doc mongoose 에서 요구하는 Document 형식의 매개변수입니다. 가장 최신의 도큐먼트 값이 매개변수로 요구됩니다.
 * @returns No.nnnn 형식으로 변환된 문자열이 반환됩니다. 예를들어 가장 최신의 데이터베이스 문서가 No.0013 값을 가지고 있다면 반환하는 값은 No.0014라는 문자열입니다
 */

export function numberdId(doc: Document): string {
  const lastNumber = doc && doc.id 
    ? parseInt(doc.id.toString().split(".")[1]) 
    : 0;
  const newNumber = lastNumber + 1;
  const newId = `No.${newNumber.toString().padStart(4, "0")}`; 
  
  return newId; 
}

/**
 * 프론트 페이지에서 전송되는 문자열 데이터를 검증하는 함수입니다. 간단하게 validator 라이브러리를 추가하여 입력값을 필터링 하고 있습니다.
 * 동일한 로직이 프론트 페이지에도 적용되어 있으며, 만일 프론트 페이지의 필터를 우회하더라도 입력 값을 2차 검증하고자 추가한 함수입니다.
 * 
 * @param requestData 프론트페이지에서 전송되는 문자열 데이터 입니다.
 */
export function validateRequestData(requestData: string): void {
  if (!validator.isLength(requestData, { min: 1, max: 100 })) {
    throw new Error('글자 수는 100글자를 넘어가면 안됩니다.');
  }

  if (validator.contains(requestData, '<') || validator.contains(requestData, '>')) {
    throw new Error('허용되지 않은 특수문자가 포함되어 있습니다.');
  }
}
