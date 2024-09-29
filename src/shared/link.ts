// 인터페이스 정의
export interface IUpdateLink {
  href: string;
  label: string;
}

// 링크 목록
const updateLink = [
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/201223/Voltan",
    label: "발탄",
  },
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/210224/Biackiss#event2",
    label: "비아키스",
  },
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/210428/Koukusaton",
    label: "쿠크세이튼",
  },
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/210728/Abrelshud",
    label: "아브렐슈드",
  },
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/220824/Illiakan",
    label: "일리아칸",
  },
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/230913",
    label: "카멘",
  },
  {
    href: "https://lostark.game.onstove.com/Promotion/Update/240131/Echidna",
    label: "에키드나",
  },
];

// updateLink를 기본 내보내기로 설정
export default updateLink;
