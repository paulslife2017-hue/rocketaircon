import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaDetails, serviceAreas } from "../../data/areas";
import { errorCodes } from "../../data/local-seo";
import seoKeywords from "../../data/seo-keywords.json";

type AreaPageProps = { params: Promise<{ slug: string }> };

const serviceChecks = [
  { title: "에어컨 수리", lead: "안 시원함·작동 불가", body: "냉방이 약하거나 전원이 들어오지 않는 원인을 확인합니다. 필터와 열교환기, 전원·제어부, 실외기 운전 상태를 순서대로 살핍니다." },
  { title: "가스·냉매 점검", lead: "압력·누설 가능성 확인", body: "냉매 충전부터 권하지 않습니다. 배관 연결부와 압력, 성에 발생 여부를 확인하고 필요한 경우에만 작업을 안내합니다." },
  { title: "누수 수리", lead: "물 떨어짐·배수 불량", body: "드레인 배관 막힘과 꺾임, 배수 기울기, 실내기 결로 상태를 확인해 물이 새는 원인을 찾습니다." },
  { title: "실외기 점검", lead: "팬 정지·소음·과열", body: "팬과 모터, 압축기, 전기·제어부를 확인합니다. 안전상 위험한 위치는 현장 조건에 따라 작업이 제한될 수 있습니다." },
  { title: "에러코드 확인", lead: "LG·삼성 오류 표시", body: "화면에 표시된 영문·숫자 코드와 모델명을 확인합니다. 제조사 공식 서비스센터가 아니며 부품 수급에 따라 작업 가능 여부가 달라집니다." },
];

function getArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const title = `${area.label} 에어컨 수리·가스충전 오늘 방문`;
  const description = `${area.name} 에어컨 수리 출장 상담. 냉방 불량, 작동 불가, 실외기, 냉매·가스충전, 누수와 에러코드를 확인합니다. 기본 출장비 3만원.`;
  return {
    title,
    description,
    keywords: [...area.keywords, `${area.label} LG에어컨수리`, `${area.label} 삼성에어컨수리`, `${area.label} 에어컨에러코드`],
    alternates: { canonical: `/area/${area.slug}` },
    openGraph: { title: `${title} | 로켓에어컨`, description, url: `/area/${area.slug}`, type: "website" },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getArea(slug);
  const detail = areaDetails[slug];
  if (!area || !detail) notFound();

  const nearbyAreas = detail.nearby.map(getArea).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const regionalKeywords = seoKeywords.filter((entry) => entry.regionSlug === area.slug);
  const faqs = [
    [`${area.label} 지역은 오늘 방문할 수 있나요?`, `${detail.visitNote} 정확한 시간은 전화 접수 후 확정해드립니다.`],
    [`${area.label} 에어컨 수리 출장비는 얼마인가요?`, "기본 출장비는 30,000원입니다. 수리·부품·냉매 비용은 별도이며 점검·진단 및 수리 비용은 작업 전 안내드립니다."],
    ["LG·삼성 에어컨 에러코드도 확인하나요?", "모델명과 화면에 표시된 영문·숫자 코드를 알려주세요. 코드와 증상을 확인한 뒤 작업 가능 여부를 안내합니다."],
    ["찬바람이 약하면 냉매를 바로 충전하나요?", "냉매 부족 외에도 오염, 실외기 과열과 부품 이상이 원인일 수 있어 압력과 작동 상태를 먼저 확인합니다."],
    ["누가 방문하나요?", "당일 방문·수리를 우선으로 운영합니다. 접수가 마감되거나 일정이 겹치는 경우 협력업체가 도급 방식으로 방문할 수 있으며 방문 전에 안내드립니다."],
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${area.label} 에어컨 수리 출장`,
        serviceType: "에어컨 수리·냉매·누수·실외기 점검",
        provider: { "@type": "Organization", name: "로켓에어컨", telephone: "+82-10-8022-5800", url: "https://rocketaircon.vercel.app" },
        areaServed: { "@type": "AdministrativeArea", name: area.name },
        url: `https://rocketaircon.vercel.app/area/${area.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "로켓에어컨", item: "https://rocketaircon.vercel.app" },
          { "@type": "ListItem", position: 2, name: "출장 지역", item: "https://rocketaircon.vercel.app/service-area" },
          { "@type": "ListItem", position: 3, name: `${area.label} 에어컨 수리`, item: `https://rocketaircon.vercel.app/area/${area.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  };

  return (
    <main className="local-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="로켓에어컨 홈"><span className="brand-mark">R</span><span className="brand-copy"><b>로켓에어컨</b><small>오늘 접수 · 오늘 방문</small></span></Link>
        <Link className="area-home-link" href="/service-area">전체 출장지역</Link>
        <a className="header-phone" href="tel:01080225800" aria-label="010-8022-5800 전화 연결"><span aria-hidden="true">☎</span><b>010-8022-5800</b></a>
      </header>

      <nav className="local-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href="/service-area">출장 지역</Link><span>›</span><b>{area.label} 에어컨 수리</b></nav>

      <section className="local-hero">
        <div><p>ROCKET AIRCON · {area.name}</p><h1><em>{area.label}</em> 에어컨 수리<br/>오늘 방문 상담</h1><span>안 시원함부터 작동 불가·실외기·누수·에러코드까지 원인부터 확인합니다.</span><div className="local-actions"><a href="tel:01080225800">지금 전화 상담</a><a href="#coverage">출장 범위 확인</a></div></div>
        <aside><small>기본 출장비</small><b>30,000원</b><p>점검·진단 및 수리 비용은 작업 전 안내드립니다.</p></aside>
      </section>

      <section className="local-intro" id="coverage">
        <div><p>지역 출장 안내</p><h2>{area.name}<br/>에어컨 출장 범위</h2></div>
        <div><p>{detail.context}</p><p>{detail.visitNote}</p><div className="neighborhood-list">{detail.neighborhoods.map((name) => <Link key={name} href={`/local/${area.slug}/${encodeURIComponent(name)}/repair`}>{name} 에어컨 수리</Link>)}</div>{area.slug === "incheon" && <small>※ 강화군·영종도는 출장 지역에서 제외됩니다.</small>}</div>
      </section>

      <section className="local-services">
        <div className="section-heading centered"><p>{area.label} 주요 서비스</p><h2>증상에 맞춰 필요한 부분을<br/><em>차례로 확인합니다.</em></h2><span>같은 증상이라도 제품과 현장 상태에 따라 원인이 다를 수 있습니다.</span></div>
        <div className="local-service-grid">{serviceChecks.map((service, index) => <article key={service.title}><small>0{index + 1}</small><h2>{area.label} {service.title}</h2><b>{service.lead}</b><p>{service.body}</p></article>)}</div>
      </section>

      <section className="local-process">
        <div><p>출장 진행 순서</p><h2>전화 접수부터<br/>작동 확인까지</h2></div>
        <ol><li><b>01</b><span>제품·증상·지역 확인</span></li><li><b>02</b><span>오늘 방문 가능 시간 안내</span></li><li><b>03</b><span>현장 점검과 원인 설명</span></li><li><b>04</b><span>비용 확인 후 작업 진행</span></li><li><b>05</b><span>냉방·작동 상태 확인</span></li></ol>
      </section>

      <section className="local-faq"><div><p>자주 묻는 질문</p><h2>{area.label} 출장 전에<br/>확인하세요.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>＋</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="nearby-areas"><p>인근 출장 지역</p><h2>{area.label}과 가까운 지역도 확인하세요.</h2><div>{nearbyAreas.map((nearby) => <Link key={nearby.slug} href={`/area/${nearby.slug}`}><b>{nearby.label} 에어컨 수리</b><span>{nearby.name} 출장 안내 →</span></Link>)}</div><Link className="all-area-link" href="/service-area">전체 출장지역 보기</Link></section>

      <section className="regional-keywords"><p>{area.label} 증상·서비스 안내</p><h2>찾으시는 증상에 맞는<br/>상세 안내를 확인하세요.</h2><div>{regionalKeywords.map((entry) => <Link key={entry.slug} href={`/keyword/${entry.slug}`}>{entry.keyword}</Link>)}</div></section>

      <section className="regional-keywords error-index"><p>LG·삼성 오류 표시</p><h2>에러코드는 모델과 함께<br/>확인해야 정확합니다.</h2><div>{errorCodes.slice(0, 10).map((entry) => <Link key={`${entry.brand}-${entry.code}`} href={`/error/${area.slug}/${entry.brand}/${entry.code.toLowerCase()}`}>{entry.brandLabel} {entry.code}</Link>)}</div><span>코드만으로 고장을 단정하지 않으며 제조사 공식 안내와 제품 모델을 함께 확인합니다.</span></section>

      <section className="contact area-contact"><div><p>{area.label} 에어컨 출장 상담</p><h2>지역과 증상을 알려주세요.</h2><span>에어컨 형태, 오류 코드와 방문 동을 말씀해 주시면 상담이 빨라집니다.</span></div><div className="contact-actions"><a href="tel:01080225800"><small>바로 전화 상담</small><b>010-8022-5800</b></a></div></section>

      <footer><div className="brand footer-brand"><span className="brand-mark">R</span><span>로켓에어컨</span></div><div><p>{area.label} 에어컨 수리 · 냉매 점검 · 누수 · 실외기 점검</p><p>기본 출장비 30,000원 · 점검·진단 비용 발생 시 사전 안내</p><p>© 2026 ROCKET AIRCON. ALL RIGHTS RESERVED.</p></div></footer>
      <a className="floating-call" href="tel:01080225800" aria-label="로켓에어컨 010-8022-5800으로 바로 전화하기"><span>☎</span><b>누르면 바로 전화 연결</b></a>
    </main>
  );
}
