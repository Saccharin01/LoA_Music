"use client"

import { useLiteral } from "../components/context/useLiteral";
import Image from "next/image";
import Link from "next/link";


export default function DetailsPage() {
  const { literal } = useLiteral(); // 선택된 데이터를 가져옴

  if (!literal || literal.length === 0) {
    return <div>No details available</div>;
  }

  const selectedProject = literal[0]
  const innerObj = literal[0].details


  return (
    <div>
      <h1>{selectedProject.title}</h1>
      <h1>{innerObj.introduce}</h1>
      <Image
        src={selectedProject.img}
        alt="이미지입니닥!"
        width={300}
        height={400}
        style={{ width: "auto", height: "auto" }}
        priority
      />
      {innerObj.about.map((data, index)=> 
        <Link
        key={index}
        href={data.link}
        >{data.placeholder}</Link>        
        )}


      <p>{selectedProject.description}</p>
      <p>{selectedProject.details.introduce}</p>
      <Link
      href="/">뒤로가기</Link>
    </div>
  );
}