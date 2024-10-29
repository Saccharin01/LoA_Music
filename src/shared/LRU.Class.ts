export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;


  /**
   * 앰플리파이 배포 환경에서 발생하는 서버 생태의 초기화 문제를 해결하기 위해 생성한 전역 인스턴스입니다.
   * 앰플리파이는 람다 기반의 서비스 플랫폼이기 때문에 현 프로젝트 로직에서 이용하고 있는 API 요청 응답에 대한 값을 저장할 필요가 있습니다.
   * 
   * @param maxSize 캐시의 최대 크기를 설정하는 매개변수입니다. constructor 선언부에 꼭 정수값을 넣어주세요
   * @set 생성된 Map 인스턴스에 값을 저장하는 함수입니다. 동일한 key 값이 존재 할 경우 해당 키와 값을 삭제하고 새로 설정합니다.
   * @get 컴포넌트에서 전역 캐시를 조회할 수 있는 메서드입니다. 이미 존재하는 키가 있으면 삭제하여 최신 순서로 이동시킵니다.
   *  혹여 키 값이 존재하지 않을 경우 undefined 값을 반환합니다.

   */

  constructor(maxSize: number) {
    this.cache = new Map<K, V>();
    this.maxSize = maxSize;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
  
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
  
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }
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
