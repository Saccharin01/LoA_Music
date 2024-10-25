"use client";
import ProjectElement from "./components/ProjectElement";
import StackElement from "./components/StackElement";

export default function MainPage() {
  return (
    <>
      <header className="mb-6 pt-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold">
          요리하다가 개발하게 된 조우식입니다.
          </h1>
        </div>
      </header>
      <main>
        <StackElement />
      </main>
      <footer className="mt-10 pb-5">
        <ProjectElement />
      </footer>
    </>
  );
}
