import DragElement from "../components/DragElement";
import DropBox from "../components/DropBox";
import MusicPlayer from "../components/MusicPlayer";
import Description from "../components/Description";

export default function MusicPage() {
  return (
    <div className="w-full min-h-screen relative p-4 sm:p-8 flex flex-col space-y-4">
      {/* 상단 섹션 */}
      <div className="flex flex-col lg:flex-row flex-grow justify-between mt-8 space-y-4 lg:space-y-0 lg:space-x-4 h-1/2 gap-10">
        <main className="w-full lg:w-3/5 flex justify-center items-center">
          <MusicPlayer />
        </main>
        <aside className="flex w-full lg:w-2/5 flex-col justify-between space-y-4 lg:space-y-0">
          <div className="bg-[#9e9e9e] min-h-[200px] sm:min-h-[300px] flex-grow h-1/2">
            <Description />
          </div>
          <div className="min-h-[100px] sm:min-h-[150px] flex justify-center items-center flex-grow h-1/2">
            <DropBox />
          </div>
        </aside>
      </div>
      {/* 하단 섹션 */}
      <footer className="flex-grow h-1/2 mt-4 lg:mt-0 min-h-[150px]">
        <DragElement />
      </footer>
    </div>
  );
}
