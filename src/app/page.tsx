"use client";
import ProjectElement from "./components/ProjectElement";
import StackElement from "./components/StackElement";

export default function MainPage() {
  return (
    <>
      <header>
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-6 pt-6">
            반갑습니다. 요리하다가 개발하게 된 조우식입니다.
          </h1>
        </div>
      </header>
      <main className="flex-grow ">
        <StackElement />
      </main>
      <footer>
        <ProjectElement />
      </footer>
    </>
  );
}
