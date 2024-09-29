import DragElement from "../components/DragElement";
import DropBox from "../components/DropBox";
import MusicPlayer from "../components/MusicPlayer";


export default function MsuicPage() {
  return (
    <div className="w-[99vw] h-[93vh] relative">
      <div className="flex h-[75%] justify-between mt-16 ">
        <main className="w-3/5 bg-indigo-300 m-5">
          <MusicPlayer />
        </main>
        <aside className="flex w-2/5 my-5 flex-col justify-between">
          <div className="bg-orange-200 h-4/6">description here</div>
          <div className="bg-orange-500 h-56 flex justify-center items-center">
            <DropBox />
          </div>
        </aside>
      </div>
      <footer className="bg-slate-300 h-[25%] ml-5">
        <DragElement />
      </footer>
    </div>
  );
}
