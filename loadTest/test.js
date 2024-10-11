const axios = require('axios');

async function runLoadTest() {
  const baseURL = "http://localhost:3000/"; // 로컬 서버 URL
  const endpoint = "api/request"; // Next.js의 API 엔드포인트
  const apiUrl = `${baseURL}${endpoint}`; // 전체 API URL 구성
  const numberOfRequests = 100; // 요청 횟수 설정
  const promises = [];

  // 동시에 여러 POST 요청을 보내기 위한 루프
  for (let i = 0; i < numberOfRequests; i++) {
    promises.push(
      axios.post(apiUrl, {
        requestLog: "테스트중!" // 'requestLog' 필드가 서버에서 인식될 수 있도록 정확히 지정
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
  }

  try {
    const results = await Promise.allSettled(promises); // 모든 요청이 완료될 때까지 기다림
    const successfulRequests = results.filter(result => result.status === 'fulfilled').length;
    const failedRequests = results.filter(result => result.status === 'rejected').length;

    console.log(`성공한 요청: ${successfulRequests}, 실패한 요청: ${failedRequests}`);
  } catch (error) {
    console.error('Error during load test:', error);
  }
}

// 함수 실행
runLoadTest();
