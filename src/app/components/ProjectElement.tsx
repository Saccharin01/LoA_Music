import { useLiteral } from "./context/useLiteral";
import { IstaticData } from "@/shared/interface/static.interface";
import { staticData } from "@/shared/static.data";
import Image from "next/image";
import Link from "next/link";
import StackTags from "./StackTags";

export default function ProjectElement() {
  const { setLiteral } = useLiteral();

  const handleSelectData = (item: IstaticData) => {
    setLiteral(item);
    console.log(item);
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Projects List</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticData.map((element, index) => (
          <Link href="/details" key={index}>
            <div
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow h-[500px] flex flex-col shadow-gray-700 hover:shadow-gray-700 justify-around"
              onClick={() => handleSelectData(element)}
            >
              {/* 외부 div로 감싸서 구조 변경 */}
              <div className="h-1/2 flex justify-center items-center overflow-hidden rounded-t-lg">
                {/* 이미지 */}
                <Image
                  src={element.img}
                  alt="이미지입니다!"
                  width={300}
                  height={200} // 고정 높이 설정
                  className="object-cover w-full h-full"
                  priority
                />
              </div>

              {/* params */}
              <div className="h-1/4 px-4 py-2">
                <h2 className="text-xl font-semibold mb-1">{element.title}</h2>
                <p className="text-gray-700">{element.description}</p>
              </div>

              {/* tagList */}
              <div className="h-1/4 px-4 py-2">
                <StackTags stackList={element.stack} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
