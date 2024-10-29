import { LRUCache } from "@/shared/LRU.Class";
import { IMailTimestemp } from "@/shared/IDataFormat";

/**
 * LRU 캐시 인스턴스와 Memo 변수를 전역으로 설정합니다.
 * LRU 캐시에는 데이터베이스에 저장되어있는 최근 메일 전송 일자 문서가 저장됩니다
 * Memo 변수에는 데이터베이스 연결 시 가장 최근 문서의 id 값을 정수로 변환해 저장합니다.
 */

declare global {
  var Memo: number; 
  var cache: LRUCache<string, IMailTimestemp>; 
}