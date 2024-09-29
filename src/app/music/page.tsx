import DragElement from "../components/DragElement";
import DropBox from "../components/DropBox";
import MusicPlayer from "../components/MusicPlayer";
import Description from "../components/Description"

export default function MsuicPage() {
  return (
    <div className="w-[99vw] h-[93vh] relative">
      <div className="flex h-[75%] justify-between mt-16 ">
        <main className="w-3/5">
          <MusicPlayer />
        </main>
        <aside className="flex w-2/5 my-5 flex-col justify-between">
          <div className="bg-[#9e9e9e] h-4/6">
          <Description/>
          </div>
          <div className="h-56 flex justify-center items-center">
            <DropBox />
          </div>
        </aside>
      </div>
      <footer className=" h-[25%] ml-5">
        <DragElement />
      </footer>
    </div>
  );
}
