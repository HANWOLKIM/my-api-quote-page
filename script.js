document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplayDiv = document.getElementById('quoteDisplay');
    const getQuoteBtn = document.getElementById('getQuoteBtn');

    // ZenQuotes API 주소 (무료, API 키 없이 사용 가능)
    // 이 API는 무작위 명언을 JSON 형태로 제공합니다.
    const API_URL = 'https://zenquotes.io/api/random';

    async function fetchQuote() {
        // 명언을 불러오는 동안 표시될 메시지
        quoteDisplayDiv.innerHTML = '<p class="loading">명언을 불러오는 중...</p>';
        quoteDisplayDiv.classList.add('loading'); // 로딩 스타일 적용
        quoteDisplayDiv.classList.remove('error'); // 혹시 이전 에러 스타일 제거

        try {
            // API 호출
            const response = await fetch(API_URL);
            
            // 응답이 성공적인지 확인 (HTTP 상태 코드 200 OK 등)
            if (!response.ok) {
                // 응답이 실패했다면 에러 발생
                throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
            }
            
            // JSON 형태로 응답 데이터 파싱
            const data = await response.json();

            // ZenQuotes API는 보통 배열 형태로 명언 데이터를 반환합니다.
            // 배열의 첫 번째 요소를 사용합니다.
            if (data && data.length > 0 && data[0].q && data[0].a) {
                const quote = data[0].q; // 명언 내용 (q = quote)
                const author = data[0].a; // 작가 이름 (a = author)

                // 가져온 명언과 작가를 웹페이지에 표시
                quoteDisplayDiv.innerHTML = `
                    <p>"${quote}"</p>
                    <p class="author">- ${author} -</p>
                `;
            } else {
                // 데이터가 없거나 예상과 다를 때 (예: q나 a 필드가 없을 때)
                quoteDisplayDiv.innerHTML = '<p class="error">명언 데이터를 찾을 수 없습니다.</p>';
                quoteDisplayDiv.classList.add('error'); // 에러 스타일 적용
            }
        } catch (error) {
            // 네트워크 오류 또는 API 응답 처리 중 오류 발생 시
            console.error('명언을 가져오는 중 오류 발생:', error);
            quoteDisplayDiv.innerHTML = '<p class="error">명언을 가져오는 데 실패했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.</p>';
            quoteDisplayDiv.classList.add('error'); // 에러 스타일 적용
        } finally {
            // 로딩 상태 해제 (오류가 났든 성공했든 로딩 메시지는 사라짐)
            quoteDisplayDiv.classList.remove('loading');
        }
    }

    // "다른 명언 보기" 버튼을 클릭하면 fetchQuote 함수 실행
    getQuoteBtn.addEventListener('click', fetchQuote);

    // 웹페이지가 처음 로드될 때도 명언을 한 번 불러오도록 설정
    fetchQuote();
});