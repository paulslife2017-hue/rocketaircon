const services = [
  { title:"냉방 불량", lead:"바람은 나오는데 시원하지 않을 때", symptoms:["설정 온도까지 내려가지 않음","예전보다 바람이 약해짐"], checks:["필터·열교환기 오염","냉매 압력","실외기 작동 상태"] },
  { title:"에어컨 작동 불가", lead:"전원이 들어오지 않거나 켜지지 않을 때", symptoms:["버튼을 눌러도 반응이 없음","켜졌다가 바로 꺼짐"], checks:["전원·차단기 상태","리모컨·수신부","기판·전기 계통"] },
  { title:"실외기 불량", lead:"실내기는 켜지지만 실외기가 돌지 않을 때", symptoms:["실외기 팬이 움직이지 않음","실외기에서 이상음이나 열이 남"], checks:["팬·모터 작동","압축기 상태","전기·제어부"] },
  { title:"냉매 점검·충전", lead:"충전 전에 부족한 원인부터 확인", symptoms:["찬바람이 잠깐 나오다 약해짐","배관에 성에가 생김"], checks:["누설 가능성","배관 연결부","기종별 적정 냉매량"] },
  { title:"누수 수리", lead:"실내기에서 물이 떨어지거나 샐 때", symptoms:["벽이나 바닥으로 물이 흐름","실내기 주변이 축축함"], checks:["드레인 배관 막힘","배수 기울기","실내기 결로 상태"] },
  { title:"소음·진동", lead:"평소와 다른 소리나 떨림이 생길 때", symptoms:["실외기에서 큰 진동음","실내기에서 덜덜거리는 소리"], checks:["팬·모터 상태","체결 부위","설치 수평과 진동 전달"] },
];

const faqs = [
  ["오늘 바로 방문 가능한가요?", "오늘 방문을 우선으로 움직입니다. 지역, 접수 시간, 앞선 현장 작업을 확인한 뒤 가장 빠른 방문 시간을 안내드립니다."],
  ["냉매는 무조건 충전하면 되나요?", "아닙니다. 냉방이 약한 원인은 필터 오염, 실외기 문제, 냉매 부족 등 다양합니다. 상태를 먼저 확인하고 냉매 작업이 필요한 경우에만 안내합니다."],
  ["출장 전에 비용을 알 수 있나요?", "증상만으로 확정하기 어려운 작업은 현장 진단 후 안내드립니다. 확인된 원인과 필요한 작업, 비용을 설명한 뒤 진행합니다."],
  ["어떤 에어컨을 점검하나요?", "벽걸이형, 스탠드형, 가정용과 소형 업소용을 중심으로 상담합니다. 제조사와 모델, 설치 환경에 따라 작업 가능 여부가 달라질 수 있습니다."],
  ["상담할 때 무엇을 알려주면 좋나요?", "에어컨 형태, 발생한 증상, 오류 코드, 방문 지역을 알려주세요. 가능하면 에어컨 전체와 문제가 보이는 부분의 사진을 함께 보내주시면 도움이 됩니다."],
];

export default function Home() {
  return (
    <main id="top">
      <div className="top-notice"><b>오늘 접수하면, 오늘 바로 달려갑니다.</b></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="로켓에어컨 홈"><span className="brand-mark">R</span><span>로켓에어컨</span></a>
        <nav aria-label="주요 메뉴"><a href="#service">서비스</a><a href="#work">점검방식</a><a href="#guide">출장안내</a><a href="#faq">자주 묻는 질문</a></nav>
        <a className="header-phone" href="tel:01080225800"><small>빠른 출장 상담</small><b>010-8022-5800</b></a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span>R</span> 에어컨 수리 · 냉매 점검 전문</p>
          <h1>에어컨 문제,<br/><em>오늘 바로 달려갑니다.</em></h1>
          <p>견디기 힘든 더위, 더 이상 참지 마세요.<br/><b>바로 고쳐드리겠습니다.</b></p>
          <div className="hero-actions"><a href="tel:01080225800">지금 전화 상담 <span>→</span></a><a href="#service">서비스 확인</a></div>
          <div className="hero-badges"><span>오늘 바로 출장</span><span>원인부터 점검</span><span>작업 전 비용 안내</span></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/>
          <img src="/rocket-aircon.png" alt="" />
          <div className="speed-card"><small>ROCKET SERVICE</small><b>오늘 접수<br/>오늘 바로 방문</b></div>
          <div className="cloud cloud-a"/><div className="cloud cloud-b"/>
        </div>
      </section>

      <section className="trust-row" aria-label="서비스 원칙">
        <div><span>01</span><b>오늘 바로 출장</b><p>접수 즉시 확인해 가장 빠른 방문 시간을 안내합니다.</p></div>
        <div><span>02</span><b>원인부터 점검</b><p>증상만 보고 부품 교체부터 권하지 않습니다.</p></div>
        <div><span>03</span><b>작업 전 설명</b><p>필요한 작업과 비용을 먼저 안내합니다.</p></div>
        <div><span>04</span><b>작동 확인</b><p>작업 후 냉방과 이상 여부를 다시 확인합니다.</p></div>
      </section>

      <section className="section services" id="service">
        <div className="section-heading centered"><p>서비스 안내</p><h2>증상에 맞춰 필요한 부분을<br/><em>하나씩 확인합니다.</em></h2><span>에어컨 문제는 같은 증상이라도 원인이 다를 수 있습니다. 현장 상태를 확인한 뒤 필요한 작업만 안내합니다.</span></div>
        <div className="service-grid">
          {services.map((service, index) => <article className="service-card" key={service.title}>
            <div className="service-card-head"><b>SERVICE</b><span>0{index+1}</span></div>
            <h3>{service.title}</h3><p className="service-lead">{service.lead}</p>
            <div className="service-detail"><b>이럴 때 문의하세요</b>{service.symptoms.map(x=><p key={x}>• {x}</p>)}</div>
            <div className="check-list"><b>주요 확인 항목</b><div>{service.checks.map(x=><span key={x}>{x}</span>)}</div></div>
          </article>)}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading light"><p>실제 작업 현장</p><h2>보이는 곳만 보지 않고<br/><em>원인을 먼저 확인합니다.</em></h2><span>직접 방문한 현장에서 촬영한 실제 작업 사진입니다.</span></div>
        <div className="work-grid">
          <figure><img className="photo-outdoor" src="/field-outdoor-hq.jpg" alt="커버를 열고 실외기 내부를 점검하는 실제 작업 현장"/><figcaption><span>ACTUAL SITE 01</span><b>실외기 내부 점검</b><p>냉방 계통과 주요 부품 상태를 함께 확인합니다.</p></figcaption></figure>
          <figure><img className="photo-parts" src="/field-parts-hq.jpg" alt="분리한 실외기 모터와 부품을 점검하는 실제 작업 현장"/><figcaption><span>ACTUAL SITE 02</span><b>모터·팬 부품 점검</b><p>소음과 진동의 원인이 되는 부품 상태를 살핍니다.</p></figcaption></figure>
          <figure><img className="photo-control" src="/field-control-hq.jpg" alt="실외기 전기 제어부를 점검하는 실제 작업 현장"/><figcaption><span>ACTUAL SITE 03</span><b>전기·제어부 확인</b><p>배선과 제어 부품을 차례로 확인합니다.</p></figcaption></figure>
          <figure><img className="photo-fan" src="/field-fan-hq.jpg" alt="실외기 팬과 열교환기를 점검하는 실제 작업 현장"/><figcaption><span>ACTUAL SITE 04</span><b>팬·열교환기 점검</b><p>회전 상태와 열교환기 오염 여부를 살핍니다.</p></figcaption></figure>
          <figure><img className="photo-compressor" src="/field-compressor-hq.jpg" alt="에어컨 내부 압축기와 배선을 점검하는 실제 작업 현장"/><figcaption><span>ACTUAL SITE 05</span><b>압축기·배선 계통 점검</b><p>내부 부품과 연결 상태를 세부적으로 확인합니다.</p></figcaption></figure>
          <figure><img className="photo-system" src="/field-system-hq.jpg" alt="대형 실외기 제어부를 점검하는 실제 작업 현장"/><figcaption><span>ACTUAL SITE 06</span><b>대형 실외기 제어부 점검</b><p>장비 구조에 맞춰 제어부와 냉방 계통을 살핍니다.</p></figcaption></figure>
        </div>
      </section>

      <section className="guide-section" id="guide">
        <div className="guide-intro"><p>출장 안내</p><h2>접수부터 마무리까지<br/>순서대로 안내드립니다.</h2><span>현장 상황에 따라 작업 내용과 소요 시간은 달라질 수 있습니다.</span><img src="/rocket-aircon.png" alt="로켓 모양의 에어컨 캐릭터"/></div>
        <ol className="guide-steps">
          <li><b>01</b><div><h3>증상·지역 확인</h3><p>에어컨 형태, 증상, 오류 코드와 방문 지역을 확인합니다.</p></div></li>
          <li><b>02</b><div><h3>오늘 방문 일정 안내</h3><p>접수 시간과 지역을 확인해 가장 빠른 방문 시간을 안내합니다.</p></div></li>
          <li><b>03</b><div><h3>현장 진단</h3><p>증상 원인을 점검하고 필요한 작업을 설명드립니다.</p></div></li>
          <li><b>04</b><div><h3>비용 확인 후 작업</h3><p>안내드린 작업과 비용을 확인한 뒤 진행합니다.</p></div></li>
          <li><b>05</b><div><h3>작동·현장 확인</h3><p>냉방 상태를 확인하고 작업 주변을 정리합니다.</p></div></li>
        </ol>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-title"><p>자주 묻는 질문</p><h2>출장 전에<br/>궁금한 점을 확인하세요.</h2><span>정확한 내용은 에어컨 기종과 현장 상태를 확인한 뒤 안내드립니다.</span></div>
        <div className="faq-list">{faqs.map(([q,a],i)=><details key={q}><summary><b>0{i+1}</b><span>{q}</span><i>＋</i></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="contact" id="contact">
        <div><p>로켓에어컨 출장 상담</p><h2>지금 증상을 알려주세요.</h2><span>에어컨 종류, 증상, 방문 지역을 말씀해 주시면 상담이 빨라집니다.</span></div>
        <div className="contact-actions"><a href="tel:01080225800"><small>전화 상담</small><b>010-8022-5800</b></a><a href="sms:01080225800"><small>문자 상담</small><b>증상·방문 지역 보내기</b></a></div>
        <p className="contact-note">증상과 방문 지역을 알려주시면 가장 빠른 방문 시간을 안내해드립니다.</p>
      </section>

      <footer><div className="brand footer-brand"><span className="brand-mark">R</span><span>로켓에어컨</span></div><div><p>에어컨 수리 · 냉매 점검 · 누수 · 소음·진동 점검</p><p className="footer-info">로켓에어컨 전용 사업자 정보 준비 중</p><p>© 2026 ROCKET AIRCON. ALL RIGHTS RESERVED.</p></div></footer>
      <a className="floating-call" href="tel:01080225800" aria-label="로켓에어컨 010-8022-5800으로 바로 전화하기"><span>☎</span><b>누르면 바로 전화 연결</b></a>
    </main>
  );
}
