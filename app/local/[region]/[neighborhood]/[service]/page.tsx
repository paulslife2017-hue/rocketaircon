import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaDetails, serviceAreas } from "../../../../data/areas";
import { localServices } from "../../../../data/local-seo";

type Props = { params: Promise<{ region: string; neighborhood: string; service: string }> };

export function generateStaticParams() {
  return serviceAreas.flatMap((area) => areaDetails[area.slug].neighborhoods.flatMap((neighborhood) =>
    localServices.map((service) => ({ region: area.slug, neighborhood, service: service.slug }))));
}

function getPage(region: string, neighborhood: string, serviceSlug: string) {
  const area = serviceAreas.find((item) => item.slug === region);
  const detail = area && areaDetails[area.slug];
  const service = localServices.find((item) => item.slug === serviceSlug);
  if (!area || !detail || !service || !detail.neighborhoods.includes(neighborhood)) return null;
  return { area, detail, service };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, neighborhood, service: serviceSlug } = await params;
  const page = getPage(region, decodeURIComponent(neighborhood), serviceSlug);
  if (!page) return {};
  const { area, service } = page;
  const place = `${area.label} ${decodeURIComponent(neighborhood)}`;
  const title = `${place} ${service.label} 오늘 방문`;
  const description = `${place} ${service.label} 출장 상담. ${service.description} 기본 출장비 3만원, 점검·수리 비용은 작업 전 안내합니다.`;
  return { title, description, alternates: { canonical: `/local/${area.slug}/${encodeURIComponent(decodeURIComponent(neighborhood))}/${service.slug}` }, openGraph: { title: `${title} | 로켓에어컨`, description, type: "website" } };
}

export default async function LocalServicePage({ params }: Props) {
  const { region, neighborhood: rawNeighborhood, service: serviceSlug } = await params;
  const neighborhood = decodeURIComponent(rawNeighborhood);
  const page = getPage(region, neighborhood, serviceSlug);
  if (!page) notFound();
  const { area, detail, service } = page;
  const canonical = `https://rocketaircon.vercel.app/local/${area.slug}/${encodeURIComponent(neighborhood)}/${service.slug}`;
  const relatedNeighborhoods = detail.neighborhoods.filter((item) => item !== neighborhood);
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: `${area.label} ${neighborhood} ${service.label}`, serviceType: service.label, provider: { "@type": "Organization", name: "로켓에어컨", telephone: "+82-10-8022-5800" }, areaServed: [area.name, neighborhood], url: canonical },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "로켓에어컨", item: "https://rocketaircon.vercel.app" },
      { "@type": "ListItem", position: 2, name: area.label, item: `https://rocketaircon.vercel.app/area/${area.slug}` },
      { "@type": "ListItem", position: 3, name: neighborhood, item: canonical },
      { "@type": "ListItem", position: 4, name: service.label, item: canonical },
    ] }
  ] };

  return <main className="local-page seo-detail-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">R</span><span className="brand-copy"><b>로켓에어컨</b><small>오늘 접수 · 오늘 방문</small></span></Link><a className="header-phone" href="tel:01080225800"><span>☎</span><b>010-8022-5800</b></a></header>
    <nav className="local-breadcrumb"><Link href="/">홈</Link><span>›</span><Link href={`/area/${area.slug}`}>{area.label}</Link><span>›</span><b>{neighborhood} {service.label}</b></nav>
    <section className="local-hero"><div className="local-hero-copy"><p className="eyebrow">{area.label} · {neighborhood}</p><h1><strong>{service.label}</strong><br />오늘 바로 달려갑니다.</h1><p className="local-lead">{service.title}</p><p>{service.description}</p><div className="local-hero-actions"><a className="primary-button" href="tel:01080225800">지금 전화하기</a><Link className="text-link" href={`/area/${area.slug}`}>{area.label} 전체 안내</Link></div></div><aside className="local-quick"><span>기본 출장비</span><strong>30,000원</strong><p>점검·진단 및 수리 비용은 작업 전 안내드립니다.</p></aside></section>
    <section className="local-section"><div className="section-heading"><p className="eyebrow">CHECK POINT</p><h2>{neighborhood} 현장에서<br />이 부분을 확인합니다.</h2></div><div className="local-service-grid">{service.checks.map((check, index) => <article key={check}><span>0{index + 1}</span><h3>{check}</h3><p>현장 상태와 제품 운전 조건을 확인한 뒤 필요한 작업만 설명합니다.</p></article>)}</div></section>
    <section className="local-note"><h2>방문 전 알려주시면 좋아요</h2><p>에어컨 형태와 모델명, 현재 증상, 오류 표시, 실외기 위치를 알려주시면 상담이 빨라집니다. 안전상 위험한 위치나 부품 수급에 따라 작업이 제한될 수 있습니다.</p><p className="brand-disclaimer">당일 방문·수리를 우선으로 운영하며, 접수 마감 또는 일정 중복 시 사전 안내 후 협력업체가 도급 방식으로 방문할 수 있습니다.</p><p className="brand-disclaimer">로켓에어컨은 LG전자·삼성전자 공식 서비스센터가 아닙니다.</p></section>
    <section className="local-section"><div className="section-heading"><p className="eyebrow">MORE SERVICES</p><h2>{neighborhood}에서<br />함께 찾는 증상</h2></div><div className="keyword-link-grid">{localServices.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={`/local/${area.slug}/${encodeURIComponent(neighborhood)}/${item.slug}`}>{neighborhood} {item.label}<span>→</span></Link>)}</div></section>
    <section className="local-section"><div className="section-heading"><p className="eyebrow">NEARBY</p><h2>{area.label} 다른 동네</h2></div><div className="neighborhood-grid">{relatedNeighborhoods.map((item) => <Link key={item} href={`/local/${area.slug}/${encodeURIComponent(item)}/${service.slug}`}>{item} {service.label}</Link>)}</div></section>
    <section className="local-final"><p>{neighborhood} 에어컨 문제로 더 기다리지 마세요.</p><h2>오늘 접수하면<br />오늘 방문을 안내합니다.</h2><a href="tel:01080225800">010-8022-5800</a></section>
    <div className="mobile-call"><a href="tel:01080225800"><span>오늘 방문 전화 접수</span><b>010-8022-5800</b></a></div>
  </main>;
}
