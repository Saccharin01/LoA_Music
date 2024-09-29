import type { Metadata } from "next";
import DragElement from "./components/DragElement";
import { DataProvider } from "./components/context/useData";
import { DragDropProvider } from "./components/context/useDragDrop";
import MusicPlayer from "./components/MusicPlayer";
import DropBox from "./components/DropBox";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "LoA Music",
  description: "Losk Ark Theme music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="w-full h-full">
        <DataProvider>
          <DragDropProvider>
            <header className="absolute w-full top-0 left-0 z-[1]">
              <Navbar />
            </header>
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
          </DragDropProvider>
        </DataProvider>
      </body>
    </html>
  );
}
