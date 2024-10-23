"use client";
import Link from "next/link";
import ProjectElement from "./components/ProjectElement";

export default function MainPage() {
  return (
    <>
      <div className="bg-[#fff6eb] w-full h-screen flex justify-center items-center flex-col">
        <div className="text-center h-1/4">
          <h1 className="text-4xl font-bold mb-6">
            반갑습니다. 이 곳은 조우식의 개인 페이지입니다.
          </h1>
          <p className="text-lg">
            아래의 버튼을 눌러서 원하는 서비스로 이동하실 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-10 mt-12 h-3/4">
        {/* music 버튼도 사실 없어져야 할 데이터임. 프로젝트 엘리먼트 내에서 관리가 될 것. */}
          <div className="flex-shrink-0">
            <Link href="/music" className="text-xl font-semibold bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition">
              Music
            </Link>
          </div>
          <div className="">
            <ProjectElement /> 
          </div>
        </div>
      </div>
    </>
  );
}
