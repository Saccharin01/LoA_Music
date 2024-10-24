import type { Metadata } from "next";
import "./globals.css";
import { StaticProvider } from "./components/context/useLiteral";

export const metadata: Metadata = {
  title: "Saccharin01's portfolio",
  description: "조우식의 페이지 입니다.",
  keywords: ["조우식", "개발자", "웹 개발", "프로그래밍", "포트폴리오", "saccharin01"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <StaticProvider>
        <body>
          <div>
            <div className="bg-[#979999] w-full h-full px-2 lg:px-60">
              {children}
            </div>
          </div>
        </body>
      </StaticProvider>
    </html>
  );
}
