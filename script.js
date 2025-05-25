document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplayDiv = document.getElementById('quoteDisplay');
    const getQuoteBtn = document.getElementById('getQuoteBtn');

    // CORS 프록시 주소
    const CORS_PROXY_URL = 'https://corsproxy.io/?';

    // 명언 API 주소 (type.fit API)
    const API_URL = 'https://type.fit/api/quotes';

    // CORS 프록시를 통해 API 호출할 최종 URL
    const FINAL_API_URL = CORS_PROXY_URL + encodeURIComponent(API_URL);
    // encodeURIComponent는 API_URL을 URL 안전한 문자열로 변환합니다.

    async function fetchQuote() {
        quoteDisplayDiv.innerHTML = '<p class="loading">명언을 불러오는 중...</p>';
        quoteDisplayDiv.classList.add('loading');
        quoteDisplayDiv.classList.remove('error');

        try {
            // 프록시를 통해 API 호출
            const response = await fetch(FINAL_API_URL);
            
            if (!response.ok) {
                throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json(); // JSON 배열 형태로 명언들을 가져옴

            if (data && data.length > 0) {
                // 가져온 명언들 중에서 무작위로 하나 선택
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomQuote = data[randomIndex];

                const quote = randomQuote.text; // 명언 내용
                let author = randomQuote.author; // 작가 이름

                // 작가 이름이 null이거나 비어있으면 '작자 미상'으로 표시
                if (!author || author === 'null') {
                    author = '작자 미상';
                }
                
                quoteDisplayDiv.innerHTML = `
                    <p>"${quote}"</p>
                    <p class="author">- ${author} -</p>
                `;
            } else {
                quoteDisplayDiv.innerHTML = '<p class="error">명언 데이터를 찾을 수 없습니다.</p>';
                quoteDisplayDiv.classList.add('error');
            }
        } catch (error) {
            console.error('명언을 가져오는 중 오류 발생:', error);
            quoteDisplayDiv.innerHTML = '<p class="error">명언을 가져오는 데 실패했습니다. 네트워크 연결을 확인하거나 잠시 후 다시 시도해주세요.</p>';
            quoteDisplayDiv.classList.add('error');
        } finally {
            quoteDisplayDiv.classList.remove('loading');
        }
    }

    getQuoteBtn.addEventListener('click', fetchQuote);
    fetchQuote(); // 페이지 로드 시 초기 명언 불러오기
});