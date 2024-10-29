"use client"

import DragElement from "../components/DragElement";
import DropBox from "../components/DropBox";
import MusicPlayer from "../components/MusicPlayer";
import Description from "../components/Description";
import React, { useRef } from "react";

export default function MusicPage() {
  const footerRef = useRef<HTMLDivElement>(null); // footer에 대한 ref 설정

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 min-h-[90vh] sm:flex flex-col space-y-4">
      {/* 상단 섹션 */}
      <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 h-full gap-10">
        <main className="w-full h-full lg:w-3/5 flex justify-center items-center">
          <MusicPlayer />
        </main>
        <aside className="flex w-full lg:w-2/5 flex-col justify-between space-y-4 lg:space-y-0">
          <div className="bg-[#9e9e9e] min-h-[200px] sm:min-h-[300px] h-auto">
            <Description />
          </div>
          <div className="flex justify-center items-center">
            <DropBox />
          </div>
        </aside>
      </div>
      {/* 하단 섹션 */}
      <footer
        ref={footerRef} // 여기서 footerRef 추가
        className="h-[40vh] mt-4 lg:mt-0 overflow-y-scroll hide-scrollbar"
      >
        <DragElement footerRef={footerRef} />
      </footer>
    </div>
  );
}
