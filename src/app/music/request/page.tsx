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
      <div>
        <input
          ref={requestLogRef}
          name="requestLog"
          placeholder="요청사항입니다"
          type="text"
          onKeyDown={handleKeyDown} 
        />
      </div>
      <div>
        <button onClick={handleSubmit}>요청 전송</button>
      </div>
    </div>
  );
}
