"use client";
import { useRef, useEffect } from "react";
import validator from "validator";

export default function RequestPage() {
  const requestLogRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const requestLog = requestLogRef.current?.value.trim() || "";

    if (!validator.isLength(requestLog, { min: 1, max: 100 })) {
      alert("입력값은 1자 이상 100자 이하여야 합니다.");
      return;
    }

    if (
      validator.contains(requestLog, "<") ||
      validator.contains(requestLog, ">")
    ) {
      alert("입력 값에 허용되지 않는 문자열이 존재합니다.");
      return;
    }

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestLog, date: new Date() }),
      });

      if (response.ok) {
        alert("요청이 성공적으로 전송되었습니다.");
        if (requestLogRef.current) {
          requestLogRef.current.value = "";
        }
      } else {
        alert("요청 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("요청 전송 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <div>
        <input
          ref={requestLogRef}
          name="requestLog"
          placeholder="요청사항입니다"
          type="text"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>요청 전송</button>
      </div>
    </div>
  );
}
