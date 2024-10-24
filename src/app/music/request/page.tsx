"use client";
import { useRef } from "react";
import Validate from "./modules/Validate";

export default function RequestPage() {
  const requestLogRef = useRef<HTMLInputElement>(null);

  
  const handleSubmit = () => {
    Validate(requestLogRef, "/api/request");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(); 
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-40">
        <div className="bg-[#9e9e9e] bg-opacity-35">
        <div>
          <input
            ref={requestLogRef}
            name="requestLog"
            placeholder="요청사항입니다"
            type="text"
            onKeyDown={handleKeyDown}
            className="w-[29rem]"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="border-2 border-solid border-gray-500 hover:border-white hover:text-white mt-20"
          >
            요청 전송
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}  