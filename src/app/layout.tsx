import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "조우식",
  description: "조우식의 페이지 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
            <div>
              {children}
            </div>
      </body>
    </html>
  );
}
