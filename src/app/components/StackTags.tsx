import { IstaticData } from "@/shared/interface/static.interface"; // IstaticData import

export default function StackTags({ stackList }: { stackList: IstaticData['stack'] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {stackList.map((tag, idx) => (
        <span
          key={idx}
          className="rounded-full bg-purple-900/50 px-2 py-0.5 text-xs text-purple-300 md:px-3 md:py-1 md:text-sm transform transition-transform hover:scale-105"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
