import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaDetails, serviceAreas } from "../../../../data/areas";
import { errorCodes } from "../../../../data/local-seo";

type Props = { params: Promise<{ region: string; brand: string; code: string }> };

export function generateStaticParams() {
  return serviceAreas.flatMap((area) => errorCodes.map((error) => ({ region: area.slug, brand: error.brand, code: error.code.toLowerCase() })));
}

function getPage(region: string, brand: string, code: string) {
  const area = serviceAreas.find((item) => item.slug === region);
  const error = errorCodes.find((item) => item.brand === brand && item.code.toLowerCase() === code.toLowerCase());
  return area && error ? { area, error, detail: areaDetails[area.slug] } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, brand, code } = await params;
  const page = getPage(region, brand, code);
  if (!page) return {};
  const { area, error } = page;
  const title = `${area.label} ${error.brandLabel} 에어컨 ${error.code} 에러코드 점검`;
  const description = `${area.label} ${error.brandLabel} 에어컨 ${error.code} 오류 출장 상담. 모델명과 표시 코드를 확인하고 안전한 점검 범위를 안내합니다. 기본 출장비 3만원.`;
  return { title, description, alternates: { canonical: `/error/${area.slug}/${error.brand}/${error.code.toLowerCase()}` }, openGraph: { title: `${title} | 로켓에어컨`, description, type: "website" } };
}

export default async function ErrorPage({ params }: Props) {
  const { region, brand, code } = await params;
  const page = getPage(region, brand, code);
  if (!page) notFound();
  const { area, error, detail } = page;
  const brandCodes = errorCodes.filter((item) => item.brand === error.brand && item.code !== error.code);
  const supportUrl = error.brand === "lg" ? "https://www.lge.co.kr/support" : "https://www.samsung.com/sec/support/";
  const canonical = `https://rocketaircon.vercel.app/error/${area.slug}/${error.brand}/${error.code.toLowerCase()}`;
  const faq = [
    [`${error.code} 코드는 무엇을 뜻하나요?`, "같은 표시라도 제품군과 모델에 따라 확인 내용이 달라질 수 있습니다. 모델명과 사용설명서의 안내를 먼저 확인해야 합니다."],
    ["전원을 계속 껐다 켜도 되나요?", "코드가 반복되거나 타는 냄새, 큰 소음, 차단기 작동이 있으면 반복 운전을 멈추고 점검을 요청해 주세요."],
    [`${area.label} 오늘 방문이 가능한가요?`, `${detail.visitNote} 접수 시 모델명과 ${error.code} 표시를 함께 알려주세요.`],
  ];
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: `${area.label} ${error.brandLabel} 에어컨 ${error.code} 점검`, provider: { "@type": "Organization", name: "로켓에어컨", telephone: "+82-10-8022-5800" }, areaServed: area.name, url: canonical },
    { "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
  ] };
  return <main className="local-page seo-detail-page error-detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">R</span><span className="brand-copy"><b>로켓에어컨</b><small>오늘 접수 · 오늘 방문</small></span></Link><a className="header-phone" href="tel:01080225800"><span>☎</span><b>010-8022-5800</b></a></header>
    <nav className="local-breadcrumb"><Link href="/">홈</Link><span>›</span><Link href={`/area/${area.slug}`}>{area.label}</Link><span>›</span><b>{error.brandLabel} {error.code}</b></nav>
    <section className="local-hero error-hero"><div className="local-hero-copy"><p className="eyebrow">{area.label} {error.brandLabel} AIR CONDITIONER</p><h1><strong>{error.code}</strong> 에러코드<br />모델부터 확인합니다.</h1><p className="local-lead">표시 코드와 현재 증상을 함께 알려주세요.</p><p>에러코드의 의미와 조치 방법은 모델에 따라 달라질 수 있습니다. 코드만 보고 부품 이상을 단정하지 않고 제품명과 운전 상태를 함께 확인합니다.</p><div className="local-hero-actions"><a className="primary-button" href="tel:01080225800">오류 상담 전화하기</a><a className="text-link" href={supportUrl} target="_blank" rel="noreferrer">제조사 공식 지원 ↗</a></div></div><aside className="error-code-card"><span>{error.brandLabel} 표시 코드</span><strong>{error.code}</strong><p>화면 전체와 모델명 라벨을 사진으로 남겨두세요.</p><div className="error-fee"><span>기본 출장비</span><b>30,000원</b><small>점검·진단 및 수리 비용은 작업 전 안내</small></div></aside></section>
    <section className="local-section"><div className="section-heading"><p className="eyebrow">SAFE CHECK</p><h2>접수 전에<br />이렇게 확인해 주세요.</h2></div><div className="local-service-grid"><article><span>01</span><h3>코드 그대로 기록</h3><p>영문과 숫자를 생략하지 말고 표시 화면 전체를 촬영해 주세요.</p></article><article><span>02</span><h3>모델명 확인</h3><p>실내기 라벨의 모델명을 확인하면 코드 해석과 부품 확인이 정확해집니다.</p></article><article><span>03</span><h3>위험 신호 확인</h3><p>탄 냄새, 큰 소음, 누전·차단기 작동이 있으면 운전을 멈추고 상담해 주세요.</p></article></div></section>
    <section className="local-note warning-note"><h2>코드만으로 고장을 단정하지 않습니다</h2><p>인터넷에 나온 동일한 코드 설명이라도 모델과 제조 연도에 따라 다를 수 있습니다. 사용설명서와 제조사 공식 지원 내용을 우선 확인하고, 임의 분해나 전기부품 조작은 하지 마세요.</p><p className="brand-disclaimer">당일 방문·수리를 우선으로 운영하며, 접수 마감 또는 일정 중복 시 사전 안내 후 협력업체가 도급 방식으로 방문할 수 있습니다.</p><p className="brand-disclaimer">로켓에어컨은 {error.brandLabel}전자 공식 서비스센터가 아닙니다. 보증 수리와 공식 부품 문의는 제조사 고객지원에서 확인해 주세요.</p></section>
    <section className="local-section"><div className="section-heading"><p className="eyebrow">RELATED CODES</p><h2>{area.label}에서 찾는<br />{error.brandLabel} 에러코드</h2></div><div className="error-code-links">{brandCodes.map((item) => <Link key={item.code} href={`/error/${area.slug}/${item.brand}/${item.code.toLowerCase()}`}>{item.code}</Link>)}</div></section>
    <section className="local-section faq-section"><div className="section-heading"><p className="eyebrow">FAQ</p><h2>{error.code} 문의 전<br />자주 묻는 내용</h2></div><div className="local-faq-list">{faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="local-final"><p>{area.label} {error.brandLabel} 에어컨 {error.code} 오류</p><h2>오늘 접수하면<br />오늘 방문을 안내합니다.</h2><a href="tel:01080225800">010-8022-5800</a></section>
    <div className="mobile-call"><a href="tel:01080225800"><span>오늘 방문 전화 접수</span><b>010-8022-5800</b></a></div>
  </main>;
}
