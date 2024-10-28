import type { Metadata } from "next";
import { DataProvider } from "./components/context/useData";
import { DragDropProvider } from "./components/context/useDragDrop";
import Navbar from "./components/Navbar";
import "./music.css";

export const metadata: Metadata = {
  title: "LoA Music",
  description: "Lost Ark Theme music",
  keywords: ["LoA Music", "Lost Ark", "Lost Ark OST"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="robots" content="index, follow" />
      <body className="bg-[#282c2c]">
        <DataProvider>
          <DragDropProvider>
            <header className="absolute w-full top-0 left-0 z-[1] h-16">
              <Navbar />
            </header>
            <main className="mt-4 w-full min-h-[95vh] px-4 sm:px-8 md:px-12">
              {children}
            </main>
          </DragDropProvider>
        </DataProvider>
      </body>
    </html>
  );
}
