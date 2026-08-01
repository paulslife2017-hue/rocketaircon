import type { Metadata } from "next";
import Link from "next/link";
import { serviceAreas } from "../data/areas";

export const metadata: Metadata = {
  title: "수도권 에어컨 수리 출장지역",
  description: "인천·부천·시흥·안산과 서울 서남권 LG·삼성 에어컨 수리, 에러코드, 냉매, 누수 출장 안내. 기본 출장비 3만원.",
  alternates: { canonical: "/service-area" },
  openGraph: {
    title: "로켓에어컨 수도권 출장지역 안내",
    description: "요청 지역의 오늘 방문 가능 시간을 확인해 안내합니다. 기본 출장비는 30,000원입니다.",
    url: "/service-area",
  },
};

const priorities = [
  ["에어컨 수리", "안 시원함, 작동 불가, 갑자기 꺼지는 증상을 점검합니다."],
  ["가스·냉매 점검", "충전부터 권하지 않고 부족 원인과 누설 가능성을 먼저 확인합니다."],
  ["누수·물 떨어짐", "드레인 배관, 배수 기울기와 실내기 결로 상태를 살핍니다."],
  ["실외기 수리", "팬·모터·압축기와 전기 제어부 작동 상태를 확인합니다."],
  ["에러코드 확인", "표시된 오류 코드를 기록하고 전원·센서·통신 계통을 점검합니다."],
  ["LG·삼성 제품", "모델명과 증상, 부품 수급 여부를 확인해 수리 가능 여부를 안내합니다."],
];

export default function ServiceAreaPage() {
  return (
    <main id="top" className="area-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="로켓에어컨 홈">
          <span className="brand-mark">R</span>
          <span className="brand-copy"><b>로켓에어컨</b><small>오늘 접수 · 오늘 방문</small></span>
        </Link>
        <Link className="area-home-link" href="/">메인으로</Link>
        <a className="header-phone" href="tel:01080225800" aria-label="010-8022-5800 전화 연결"><span aria-hidden="true">☎</span><b>010-8022-5800</b></a>
      </header>

      <section className="area-hero">
        <div>
          <p>ROCKET SERVICE AREA</p>
          <h1>수도권 에어컨 수리<br/><em>출장 가능 지역</em> 안내</h1>
          <span>지역과 접수 시간을 확인해 오늘 방문 가능한 가장 빠른 시간을 안내합니다.</span>
          <div className="area-hero-actions"><a href="tel:01080225800">지금 전화 상담</a><Link href="#areas">지역 확인</Link></div>
        </div>
        <aside aria-label="출장비 안내"><small>기본 출장비</small><b>30,000원</b><p>수리·부품·냉매 비용은 별도이며, 검사·진단이 필요한 경우 진행 전에 안내합니다.</p></aside>
      </section>

      <section className="area-priority" aria-label="주요 출장 서비스">
        {priorities.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{description}</p></article>)}
      </section>

      <section className="area-list-section" id="areas">
        <div className="section-heading centered"><p>출장 지역 안내</p><h2>요청하신 지역을<br/><em>한눈에 확인하세요.</em></h2><span>인천은 강화군과 영종도를 제외합니다. 당일 방문 가능 여부는 접수 시간과 앞선 현장 일정에 따라 달라질 수 있습니다.</span></div>
        <div className="area-card-grid">
          {serviceAreas.map((area, index) => <article id={area.slug} className="area-card" key={area.slug}>
            <div><small>AREA {String(index + 1).padStart(2, "0")}</small><b>{area.name}</b></div>
            <p>{area.note}</p>
            <h3>{area.label} 에어컨 출장 주요 항목</h3>
            <ul>{area.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section className="area-seo-copy">
        <div><p>검색어보다 먼저 보는 것</p><h2>같은 냉방 불량도<br/>원인은 다를 수 있습니다.</h2></div>
        <div><p>에어컨 수리, 가스충전, 냉매충전, 에어컨 AS를 찾고 계시더라도 현장 상태에 따라 필요한 작업은 달라집니다. 로켓에어컨은 냉매 압력, 실외기 작동, 배수와 전기 계통을 확인한 뒤 필요한 작업과 비용을 설명합니다.</p><p>LG·삼성 에어컨의 영문·숫자 에러코드는 사진으로 남겨 상담할 때 알려주세요. 로켓에어컨은 제조사 공식 서비스센터가 아니며 모델과 부품 수급 여부에 따라 작업 가능 여부가 달라질 수 있습니다.</p><p>기본 출장비는 30,000원이며 수리·부품·냉매 작업 비용은 별도입니다. 현장 점검 후 별도의 검사·진단이 필요한 경우 비용이 발생할 수 있으며, 진행 전에 안내드립니다.</p></div>
      </section>

      <section className="contact area-contact">
        <div><p>로켓에어컨 출장 상담</p><h2>지역과 증상을 알려주세요.</h2><span>에어컨 형태, 현재 증상과 방문 지역을 말씀해 주시면 상담이 빨라집니다.</span></div>
        <div className="contact-actions"><a href="tel:01080225800"><small>바로 전화 상담</small><b>010-8022-5800</b></a></div>
      </section>

      <footer><div className="brand footer-brand"><span className="brand-mark">R</span><span>로켓에어컨</span></div><div><p>에어컨 수리 · 가스·냉매 점검 · 누수 · 실외기 점검</p><p>기본 출장비 30,000원 · 별도 검사·진단 필요 시 비용 사전 안내</p><p>© 2026 ROCKET AIRCON. ALL RIGHTS RESERVED.</p></div></footer>
      <a className="floating-call" href="tel:01080225800" aria-label="로켓에어컨 010-8022-5800으로 바로 전화하기"><span>☎</span><b>누르면 바로 전화 연결</b></a>
    </main>
  );
}
