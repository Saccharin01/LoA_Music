"use client";

import { useLiteral } from "../components/context/useLiteral";
import Image from "next/image";
import Link from "next/link";
import ErrorPage from "../components/ErrorPage"; 
import ButtonGroup from "../components/ButtonGroup"; 
import StackTags from "../components/StackTags";

export default function DetailsPage() {
  const { literal } = useLiteral();

  if (!literal) {
    return <ErrorPage />;
  }

  const selectedProject = literal;
  const innerObj = selectedProject.details;

  return (
    <div className="h-[100vh]">
      <div className="pt-12">
        <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
        <div className="mb-4">
          <p>{selectedProject.details.introduce}</p>
          <p>{selectedProject.details.params}</p>
        </div>

        <StackTags stackList={selectedProject.stack} />

        <ButtonGroup aboutProps={innerObj.about} />

        <Link
          href="/"
          className="ml-auto bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        >
          뒤로가기
        </Link>

        <div className="flex justify-center my-4">
          <Image
            src={selectedProject.img}
            alt="이미지입니다!"
            width={300}
            height={400}
            className="w-auto h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
