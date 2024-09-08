import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DragElement from "./components/DragElement";
import MusicPlayer from "./components/MusicPlayer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <div className="flex h-4/5 justify-between">
          <main className="w-3/5 bg-indigo-300 m-5">
            <MusicPlayer/>
          </main>

          <aside className="flex w-2/5 bg-emerald-200  mr-5 my-5 flex-col justify-between">
            <div className="bg-orange-200 h-4/6">description here</div>
            <div className="bg-orange-500 h-56">dropBox here</div>
          </aside>
        </div>

        <footer className="h-1/5 bg-amber-700 mx-5">
          <DragElement />
        </footer>
      </body>
    </html>
  );
}
