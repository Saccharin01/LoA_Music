import { useLiteral } from "./context/useLiteral";
import { IstaticData } from "@/app/components/interface/static.interface";
import { staticData } from "@/shared/static.data";
import Image from "next/image";
import Link from "next/link";

export default function ProjectElement() {
  const { setLiteral } = useLiteral(); 

  const handleSelectData = (item: IstaticData) => {
    setLiteral([item]); 
    console.log(item);
  };

  return (
    <div>
      <h1>Projects List</h1>
      {staticData.map((element, index) => (
        <div key={index} onClick={() => handleSelectData(element)}>
          <Link href="/details">
              <Image
                src={element.img}
                alt="이미지입니닥!"
                width={300}
                height={400}
                style={{ width: "auto", height: "auto" }}
                priority
              />
              <div>
                <h2>{element.title}</h2>
                <p>{element.description}</p>
                <p>{element.details.introduce}</p>
              </div>
          </Link>
          <div>
            {element.stack.map((stack, idx) => (
              <span
                key={idx}
                className="rounded-full bg-purple-900/50 px-2 py-0.5 text-xs text-purple-300 md:px-3 md:py-1 md:text-sm"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
