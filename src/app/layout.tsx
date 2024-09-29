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
            {children}
          </DragDropProvider>
        </DataProvider>
      </body>
    </html>
  );
}
