
import Link from "next/link";
export default function MainPage() {
  return (
    <>
      <div className="bg-[#fff6eb] w-[100vw] h-[100vh] flex justify-center items-center flex-col">
        <div>
          <h1 className="text-4xl font-bold">
            반갑습니다. 이 곳은 조우식의 개인 페이지입니다.
          </h1>
          <p className="text-center mt-10">
            아래의 버튼을 눌러서 원하는 서비스로 이동하실 수 있습니다.
          </p>
        </div>
        <div className="flex justify-around mt-20 w-full">
          <div>
            <Link href="/music">music</Link>
          </div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
      </div>
    </>
  );
}
