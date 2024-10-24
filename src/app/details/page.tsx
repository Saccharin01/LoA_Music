"use client";

import { useLiteral } from "../components/context/useLiteral";
import Image from "next/image";
import Link from "next/link";

export default function DetailsPage() {
  const { literal } = useLiteral(); // 선택된 데이터를 가져옴

  if (!literal || literal.length === 0) {
    return <div>No details available</div>;
  }

  const selectedProject = literal[0];
  const innerObj = literal[0].details;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
      <div className="w-full max-w-sm"> {/* 부모 컨테이너에 max-width 설정 */}
        <Image
          src={selectedProject.img}
          alt="이미지입니다!"
          width={300}
          height={400}
          className="w-auto h-auto" // Tailwind CSS로 종횡비 유지
          priority
        />
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        {innerObj.about.map((data, index) => (
          <Link
            key={index}
            href={data.link}
            target="_blank" // 새 창에서 열기
            rel="noopener noreferrer" // 보안 강화
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          >
            {data.placeholder}
          </Link>
        ))}
      </div>

      <p className="mb-4">{selectedProject.description}</p>
      <p className="mb-4">{selectedProject.details.introduce}</p>
      <Link
        href="/"
        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      >
        뒤로가기
      </Link>
    </div>
  );
}
