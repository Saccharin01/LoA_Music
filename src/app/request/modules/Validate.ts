import validator from "validator";

export default async function validate(
  requestLogRef: React.RefObject<HTMLInputElement>,
  apiEndpoint: string
) {
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
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestLog, date: new Date() }),
    });

    if (response.ok) {
      alert("요청이 성공적으로 전송되었습니다.");
      requestLogRef.current && (requestLogRef.current.value = "");
    } else {
      const errorMessage = await response.text();
      alert(`요청 전송에 실패했습니다: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error sending request:", error);
    alert("요청 전송 중 오류가 발생했습니다.");
  }
}
