export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map<K, V>();
    this.maxSize = maxSize; // 캐시의 최대 크기 설정
  }

  set(key: K, value: V): void {
    // 이미 존재하는 키가 있으면 삭제하여 최신 순서로 이동
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
  
    // 캐시가 최대 크기를 초과하면 가장 오래된 항목 제거
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value; // 가장 오래된 키 찾기
      if (oldestKey !== undefined) { // 키가 undefined가 아닌 경우에만 삭제
        this.cache.delete(oldestKey);
      }
    }
  
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
    // 키가 존재하지 않으면 undefined 반환
    if (!this.cache.has(key)) {
      return undefined;
    }
    // 기존 항목을 삭제 후 다시 추가하여 최신 순서로 갱신
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value as V);
    return value;
  }

  delete(key: K): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}
