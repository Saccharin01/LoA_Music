"use client";

import { useLiteral } from "../components/context/useLiteral";
import ErrorPage from "../components/ErrorPage";
import ButtonGroup from "../components/ButtonGroup";
import StackTags from "../components/StackTags";
import SampleImage from "../components/SampleImage";

export default function DetailsPage() {
  const { literal } = useLiteral();

  if (!literal) {
    return <ErrorPage />;
  }

  const selectedProject = literal;
  const innerObj = selectedProject.details;

  return (
    <div>
      <div className="pt-12">
        <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>

        <div className="mb-4">
          <p>{innerObj.introduce}</p>
          <p>{innerObj.params}</p>
        </div>

        <StackTags stackList={selectedProject.stack} />
        <ButtonGroup aboutProps={innerObj.about} />

        <SampleImage sampleImages={innerObj.sampleImg} />
      </div>
    </div>
  );
}
