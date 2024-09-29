"use client";

// app/page.tsx
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/music'); // '/music' 경로로 이동
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-[94vh] bg-[#1a1a1a] text-[#ffffff]"
    >
      <div
        className="flex flex-col justify-evenly items-center text-center p-8 bg-[#2d2d2d] rounded-lg shadow-lg min-w-[60vw] min-h-[80vh]"
      >
        <header className="mb-6">
          <h1 className="text-[48px] font-bold">LoA music</h1>
          <p className="text-[#cccccc] mt-2">로스트아크의 음악을 소개합니다</p>
        </header>
        <div className="flex flex-col items-center">
          <p className="text-[#cccccc] mt-2">로스트아크의 장점이 뭐가 있을까 생각해봤을 때, 먼저 떠오르는 건 음악이였던 것 같습니다.</p>
          <p className="text-[#cccccc] mt-2">으레 많은 게임들이 그렇지만, 특히 로스트아크는 게임 내 BGM에 정말 많은 공을 들이는 것으로 유명합니다.</p>
          <p className="text-[#cccccc] mt-2">이번 기회에, 이 페이지에서 로스트아크의 음악을 듣고 &apos;이 게임에도 이런 음악이 있구나&apos; 하고 알아가는 시간이 되었으면 좋겠습니다.</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="p-2 bg-[#4d4d4d] hover:bg-[#666666] text-[#ffffff] rounded-md"
            onClick={handleRedirect}
          >
            바로가기
          </button>
        </div>
      </div>
    </div>
  );
}
