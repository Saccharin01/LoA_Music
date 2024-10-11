import { LRUCache } from "../../../shared/LRU.Class";
import { IMailTimestemp } from "@/shared/IDataFormat";

const cache = new LRUCache<string, IMailTimestemp>(3);

export async function MailController(emailType: string): Promise<void> {
  const currentTime = new Date().getTime();
  const cooldownPeriod = 60000; // 1분 동안 쿨다운 시간 설정

  // 캐시에서 최근 메일 전송 시간을 가져옴
  const cachedData = cache.get(emailType);

  if (cachedData && (currentTime - new Date(cachedData.sentTime).getTime()) < cooldownPeriod) {
    console.log(`쿨다운 기간 내에 있으므로 메일 전송이 차단되었습니다.`);
    return;
  }

  // 데이터베이스에서 최근 메일 전송 기록 조회
  const lastEmailEvent = await fetchLastEmailEvent(emailType);
  if (lastEmailEvent && (currentTime - new Date(lastEmailEvent.sentTime).getTime()) < cooldownPeriod) {
    console.log(`데이터베이스 기록에 따라 메일 전송이 차단되었습니다.`);
    return;
  }

  // 메일 전송 로직 실행
  await sendMailNotification(emailType);

  // 캐시 갱신
  cache.set(emailType, { _id: "uniqueId", sentTime: new Date(), status: "sent" });
}

// 최근 메일 전송 이벤트를 데이터베이스에서 가져오는 함수
async function fetchLastEmailEvent(emailType: string): Promise<IMailTimestemp | null> {
  // 데이터베이스에서 최근 메일 전송 이벤트를 조회하는 로직
  // 예를 들어 Mongoose를 사용하여 데이터베이스에 접근할 수 있습니다.
  return null; // 예시로 null을 반환, 실제 구현에서는 데이터베이스 쿼리를 추가
}

// 메일 전송 함수 예시
async function sendMailNotification(emailType: string): Promise<void> {
  console.log(`메일이 전송되었습니다: ${emailType}`);
  // 실제 메일 전송 로직 추가
}
