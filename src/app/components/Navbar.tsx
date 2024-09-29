"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();

  // useEffect(() => {
  //   if (path === "/") setIsView(false);
  //   else setIsView(true);
  // }, [path]);

  return (
    <>
      <nav>
        <div className="w-screen fixed z-50 bg-[#282c2c]">
          <div className="flex justify-between h-16 px-10 shadow items-cente">
            <div className="flex items-center space-x-1">
              <h1 className="text-xl lg:text-2xl font-bold cursor-pointer mr-3">
                LoA Music
              </h1>
              <div className="hidden lg:flex justify-around space-x-4 gap-10">
                <Link
                  href="test"
                  className="hover:text-yellow-500 text-slate-200 pl-10"
                >
                  Home
                </Link>
                <Link
                  href="test"
                  className="hover:text-yellow-500 text-slate-200"
                >
                  About
                </Link>
                <Link
                  href="test"
                  className="hover:text-yellow-500 text-slate-200"
                >
                  ADMIN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
