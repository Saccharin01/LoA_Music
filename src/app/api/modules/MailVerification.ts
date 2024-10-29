import MailNotification from "../modules/MailNotification";
import { LogMailEvent, fetchLastEmailEvent } from "../modules/InitalizeServerENV";
import { MailTimestemp } from "../model/mongooseModel";
import { numberdId } from "../modules/RequestFormat";

/**
 * 메일 전송 로직을 처리하는 메인 함수입니다.
 * @param newId 데이터베이스에 저장되어있는 가장 최신 문서의 id 값을 요구합니다. 문자열로 들어오기 때문에 내부에서 정수값으로 처리합니다.
 * @param REQUEST_THRESHOLD n개 이상 요청사항이 누적되었을 때 n을 정의하는 쓰레스홀드 변수값입니다. 기본값으로 정수형 10이 지정되어있습니다.
 */

export async function MailVerification(newId: string, REQUEST_THRESHOLD : number = 10) {
  try {
    const numericCurrentId = parseInt(newId.split(".")[1], 10);
    const idDifference = numericCurrentId - globalThis.Memo;

    if (idDifference >= REQUEST_THRESHOLD) {
      const currentDate = new Date();
      const currentDay = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜 가져오기

      const cachedData = globalThis.cache.get("lastEmailEvent");

      // 캐시에 저장된 날짜의 일(day) 값이 같으면 메일을 전송하지 않음
      if (cachedData && cachedData.sentTime.toISOString().split('T')[0] === currentDay) {
        console.log(`오늘 이미 메일이 전송되었으므로 메일 전송이 생략되었습니다.`);
      } else {
        const lastEmailEvent = await fetchLastEmailEvent(MailTimestemp);
        const lastEventDay = lastEmailEvent ? lastEmailEvent.sentTime.toISOString().split('T')[0] : null;

        // 데이터베이스에 기록된 마지막 메일 전송 일자가 오늘과 같으면 메일 전송 생략
        if (lastEventDay === currentDay) {
          console.log(`데이터베이스 기록에 따라 오늘은 이미 메일이 전송되었습니다.`);
        } else {
          // 메일 전송 로직 실행
          await MailNotification(idDifference);

          // 캐시 갱신
          globalThis.cache.set("lastEmailEvent", { id: "uniqueId", sentTime: new Date(), status: "sent" });

          const MailLogID = await MailTimestemp.findOne().sort({ id: -1 }).exec();
          await LogMailEvent(
            {
              id: numberdId(MailLogID),
              sentTime: new Date(),
              status: "sent",
            },
            MailTimestemp
          );

          console.log("메일 전송 및 로그 기록 완료");
        }
      }

      // 최신 Memo 업데이트
      globalThis.Memo = numericCurrentId;
    }
  } catch (error) {
    console.error("Error processing mail verification:", error);
  }
}
