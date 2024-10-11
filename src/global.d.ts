import { LRUCache } from "@/shared/LRU.Class";
import { IMailTimestemp } from "@/shared/IDataFromat";

declare global {
  var Memo: number; 
  var cache: LRUCache<string, IMailTimestemp>; 
}