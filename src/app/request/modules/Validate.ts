import validator from "validator";

export default async function validate(
  refs: {
    logRef: React.RefObject<HTMLInputElement>;
    bodyRef: React.RefObject<HTMLTextAreaElement>;
  },
  apiEndpoint: string
) {
  const requestLog = refs.logRef.current?.value.trim() || "";
  const requestParams = refs.bodyRef.current?.value.trim() || "";

  // requestLog 유효성 검사
  if (!validator.isLength(requestLog, { min: 1, max: 100 })) {
    alert("요청 사항은 1자 이상 100자 이하여야 합니다.");
    return;
  }

  if (
    validator.contains(requestLog, "<") ||
    validator.contains(requestLog, ">")
  ) {
    alert("요청 사항에 허용되지 않는 문자가 포함되어 있습니다.");
    return;
  }

  // requestParams 유효성 검사
  if (!validator.isLength(requestParams, { min: 1, max: 500 })) {
    alert("본문 내용은 1자 이상 500자 이하여야 합니다.");
    return;
  }

  if (
    validator.contains(requestParams, "<") ||
    validator.contains(requestParams, ">")
  ) {
    alert("본문 내용에 허용되지 않는 문자가 포함되어 있습니다.");
    return;
  }

  // API 요청
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestLog: requestLog,
        requestParams: requestParams,
        date: new Date(),
      }),
    });

    if (response.ok) {
      alert("요청이 성공적으로 전송되었습니다.");
      refs.logRef.current && (refs.logRef.current.value = "");
      refs.bodyRef.current && (refs.bodyRef.current.value = "");
    } else {
      const errorMessage = await response.text();
      alert(`요청 전송에 실패했습니다: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error sending request:", error);
    alert("요청 전송 중 오류가 발생했습니다.");
  }
}
