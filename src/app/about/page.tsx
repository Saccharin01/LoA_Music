"use client";
import AboutPage from "../components/AboutPage";
import { useState } from "react";
import updateLink from "@/shared/link";

export default function About() {
  const [linkData, setLinkData] = useState(updateLink);

  return (
    <div className="bg-slate-300 mt-20 h-[96vh] w-[96vw]">
      {linkData.map((link) => (
        <AboutPage key={link.label} updateLink={[link]} />
      ))}
    </div>
  );
}