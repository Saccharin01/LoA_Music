import type { Metadata } from "next";
import { DataProvider } from "./components/context/useData";
import { DragDropProvider } from "./components/context/useDragDrop";
import Navbar from "./components/Navbar";
import "./music.css";

export const metadata: Metadata = {
  title: "LoA Music",
  description: "Losk Ark Theme music",
  keywords: ["LoA Music", "Losk Ark", "Losk Ark OST"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <meta name="robots" content="index, follow" />
      <body>
        <div className="bg-[#282c2c]">
          <DataProvider>
            <DragDropProvider>
              <header className="absolute w-full top-0 left-0 z-[1] h-16">
                <Navbar />
              </header>
              <div className="mt-16 w-[99vw] h-[95vh]">{children}</div>
            </DragDropProvider>
          </DataProvider>
        </div>
      </body>
    </html>
  );
}
