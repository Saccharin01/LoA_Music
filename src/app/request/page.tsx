"use client";
import { useEffect, useRef } from "react";
import Validate from "./modules/Validate";

export default function RequestPage() {
  const requestLogRef = useRef<HTMLInputElement>(null);
  const requestBodyRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    Validate(
      { logRef: requestLogRef, bodyRef: requestBodyRef },
      "/api/request"
    );
  };

  useEffect(() => {
    const handleKeyCombination = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.ctrlKey) {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyCombination);
    return () => {
      document.removeEventListener("keydown", handleKeyCombination);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center p-4 sm:p-10">
      <div className="flex flex-col h-full p-4 sm:p-10 bg-[#9e9e9e] bg-opacity-35 rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl lg:max-w-3xl">
        <div className="mb-4">
          <input
            ref={requestLogRef}
            name="requestLog"
            placeholder="요청사항입니다"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <textarea
            ref={requestBodyRef}
            name="requestBody"
            placeholder="불편한 부분이 있다면 적어주세요. ctrl+enter 키로 전송할 수도 있습니다!"
            className="w-full p-2 border border-gray-300 rounded-md resize-none aspect-[3/1]"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 border-2 border-solid border-gray-500 hover:border-white hover:text-white rounded-md"
          >
            요청 전송
          </button>
        </div>
      </div>
    </div>
  );
}
