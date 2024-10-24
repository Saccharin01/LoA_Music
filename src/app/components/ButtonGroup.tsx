import Link from "next/link";
import { IstaticData } from "@/shared/interface/static.interface";

export default function ButtonGroup({ aboutProps }: { aboutProps: IstaticData['details']['about'] }) {
  return (
    <div className="flex flex-wrap gap-4 my-6">
      {aboutProps.map((button, index) => (
        <Link
          key={index}
          href={button.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        >
          {button.placeholder}
        </Link>
      ))}
    </div>
  );
}
