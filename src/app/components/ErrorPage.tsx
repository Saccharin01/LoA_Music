"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">잘못된 접근입니다!</h1>
        <h3 className="text-xl mb-6">
          선택하신 데이터가 없습니다. 메인 페이지에서 프로젝트 리스트를 클릭해주세요.
        </h3>

        <Link
          href="/"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          뒤로가기
        </Link>
      </div>
    </div>
  );
}
