import Link from "next/link";
import type { IUpdateLink } from "@/shared/link"; // 타입 가져오기

// props 타입 정의
interface AboutPageProps {
  updateLink: IUpdateLink[];
}

// 컴포넌트 정의
export default function AboutPage({ updateLink }: AboutPageProps) {
  return (
    <div>
      {updateLink.map((link) => (
        <div key={link.label}>
          <Link
            href={link.href}
            target="_blank" // 새 탭에서 열리도록 설정
            rel="noopener noreferrer" // 보안 설정
          >
            {link.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
