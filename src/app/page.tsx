"use client";
import ProjectElement from "./components/ProjectElement";

export default function MainPage() {
  return (
    <>
      <header>
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">
            반갑습니다. 이 곳은 조우식의 개인 페이지입니다.
          </h1>
          <p className="text-lg">
            아래의 버튼을 눌러서 원하는 서비스로 이동하실 수 있습니다.
          </p>
        </div>
      </header>

      <main className="flex-grow"></main>

      <footer>
        <ProjectElement />
      </footer>
    </>
  );
}
