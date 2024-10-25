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
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => handleSelectData(element)}
          >
            <Link href="/details">
              <div className="flex justify-center items-center">
                <Image
                  src={element.img}
                  alt="이미지입니다!"
                  width={300} // 원래 설정된 너비
                  height={400} // 원래 설정된 높이
                  className="w-auto h-auto" // Tailwind로 너비와 높이를 자동으로 설정
                  priority
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">{element.title}</h2>
                <p className="text-gray-700 mb-2">{element.description}</p>
                {/* <p className="text-gray-500">{element.details.introduce}</p> */}
              </div>
              <StackTags stackList={element.stack}/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
