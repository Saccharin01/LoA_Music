import { StackUsage } from "@/shared/static.usage";

export default function StackElement() {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-6">What I Used</h2>
      </div>

      <div className="space-y-4 py-6">
        {StackUsage.map((category, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold">{category.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              {category.params.map((item, idx) => (
                <p key={idx} className="flex items-center space-x-2">
                  <span>•</span> {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
