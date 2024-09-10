import type { Metadata } from "next";
import DragElement from "./components/DragElement copy";
import { DataProvider } from "./components/context/useData copy";
import MusicPlayer from "./components/MusicPlayer";
import DropBox from "./components/DropBox";
import "./globals.css";

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
      <body className="w-screen h-screen">
        <DataProvider>
          <div className="flex h-4/5 justify-between">
            <main className="w-3/5 bg-indigo-300 m-5">
              <MusicPlayer />
            </main>

            <aside className="flex w-2/5 bg-emerald-200  mr-5 my-5 flex-col justify-between">
              <div className="bg-orange-200 h-4/6">description here</div>
              <div className="bg-orange-500 h-56 flex justify-center items-center">
                <DropBox />
              </div>
            </aside>
          </div>

          <footer className="h-1/5 bg-amber-700 mx-5">
            <DragElement />
          </footer>
        </DataProvider>
      </body>
    </html>
  );
}
