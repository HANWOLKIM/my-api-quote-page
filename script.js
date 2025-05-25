document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplayDiv = document.getElementById('quoteDisplay');
    const getQuoteBtn = document.getElementById('getQuoteBtn');

    // 명언 데이터를 직접 배열로 저장합니다.
    const quotes = [
        { text: "행동은 모든 성공의 가장 기본적인 핵심이다.", author: "파블로 피카소" },
        { text: "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 계속하려는 용기이다.", author: "윈스턴 처칠" },
        { text: "네 자신의 삶을 살아라. 네 자신의 꿈을 꾸고, 네 자신의 길을 걸어라.", author: "마크 트웨인" },
        { text: "미래는 꿈을 믿는 사람들의 것이다.", author: "엘리너 루스벨트" },
        { text: "가장 큰 위험은 아무런 위험도 감수하지 않는 것이다.", author: "마크 저커버그" },
        { text: "할 수 있다고 믿든, 할 수 없다고 믿든, 당신이 믿는 대로 될 것이다.", author: "헨리 포드" },
        { text: "어떤 일을 시작하기에 가장 좋은 시간은 20년 전이다. 두 번째로 좋은 시간은 바로 지금이다.", author: "중국 속담" },
        { text: "인생은 자신을 찾는 것이 아니다. 인생은 자신을 만드는 것이다.", author: "조지 버나드 쇼" },
        { text: "성공은 행복의 열쇠가 아니다. 행복이 성공의 열쇠이다.", author: "알버트 슈바이처" },
        { text: "시작하는 것이 가장 어렵고, 나머지는 노력이다.", author: "오노레 드 발자크" },
        { text: "넘어져도 괜찮아. 다시 일어나는 법을 배우는 거야.", author: "아프리카 속담" }
        // 더 많은 명언을 추가하고 싶으면 여기에 { text: "내용", author: "작가" }, 형식으로 추가하세요.
    ];

    function displayRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplayDiv.innerHTML = '<p class="error">표시할 명언이 없습니다.</p>';
            quoteDisplayDiv.classList.add('error');
            return;
        }

        // 명언 목록에서 무작위로 하나 선택
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        const quote = randomQuote.text;
        let author = randomQuote.author;

        // 작가 이름이 없으면 '작자 미상'으로 표시
        if (!author) {
            author = '작자 미상';
        }
        
        quoteDisplayDiv.innerHTML = `
            <p>"${quote}"</p>
            <p class="author">- ${author} -</p>
        `;
        quoteDisplayDiv.classList.remove('loading', 'error'); // 로딩/에러 스타일 제거
    }

    // "다른 명언 보기" 버튼 클릭 시 명언 변경
    getQuoteBtn.addEventListener('click', displayRandomQuote);

    // 페이지 로드 시 초기 명언 표시
    displayRandomQuote();
});