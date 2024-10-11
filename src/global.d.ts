import { LRUCache } from "@/shared/LRU.Class";
import { IMailTimestemp } from "@/shared/IDataFormat";

declare global {
  var Memo: number; 
  var cache: LRUCache<string, IMailTimestemp>; 
}