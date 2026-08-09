import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areaDetails, serviceAreas } from "../../data/areas";
import seoKeywords from "../../data/seo-keywords.json";

type KeywordEntry = (typeof seoKeywords)[number];
type KeywordPageProps = { params: Promise<{ slug: string }> };

type IntentContent = {
  label: string;
  headline: string;
  lead: string;
  description: string;
  signs: string[];
  checks: string[];
  caution: string;
};

const intentContent: Record<string, IntentContent> = {
  repair: { label:"에어컨 수리", headline:"고장 증상부터 원인을 확인합니다.", lead:"냉방 불량·작동 정지·갑작스러운 꺼짐", description:"같은 고장처럼 보여도 전원, 냉매, 실외기와 제어부 등 원인은 다를 수 있습니다. 제품 상태를 확인한 뒤 필요한 작업을 안내합니다.", signs:["바람은 나오지만 시원하지 않음","전원이 들어오지 않거나 바로 꺼짐","평소와 다른 소음·진동 발생"], checks:["전원·차단기와 제어부","필터·열교환기와 냉매 압력","실내기·실외기 작동 상태"], caution:"부품 교체가 필요한 경우 기종과 수급 여부를 확인한 뒤 안내합니다." },
  "gas-charge": { label:"가스충전", headline:"충전 전에 부족한 원인부터 봅니다.", lead:"냉방 저하·배관 성에·미지근한 바람", description:"에어컨 냉매는 정상 상태에서 반복적으로 줄어드는 소모품이 아닙니다. 압력과 배관 연결부를 확인하고 냉매 작업이 필요한 경우에만 안내합니다.", signs:["찬바람이 잠깐 나오다 약해짐","배관이나 연결부에 성에가 생김","실외기는 돌지만 실내가 시원하지 않음"], checks:["기종별 냉매 종류","고압·저압 운전 상태","배관 연결부와 누설 가능성"], caution:"냉매 종류와 충전량, 누설 여부에 따라 작업 내용과 비용이 달라질 수 있습니다." },
  refrigerant: { label:"냉매 점검", headline:"냉매량과 누설 가능성을 함께 확인합니다.", lead:"냉매 부족 의심·냉방 효율 저하", description:"냉매가 부족해 보이는 증상도 실외기 과열이나 열교환 불량에서 발생할 수 있습니다. 운전 상태를 먼저 점검해 불필요한 충전을 줄입니다.", signs:["설정 온도까지 내려가지 않음","바람이 예전보다 덜 차가움","실내기 또는 배관에 결빙 발생"], checks:["냉매 압력과 종류","배관·밸브 연결 상태","실외기 열교환과 운전 전류"], caution:"누설 수리가 먼저 필요한 현장은 충전만으로 해결되지 않을 수 있습니다." },
  leak: { label:"누수 수리", headline:"물이 생긴 위치부터 배수 경로를 봅니다.", lead:"실내기 물 떨어짐·벽면 누수·배수 불량", description:"실내기 누수는 드레인 막힘, 배수 기울기, 결로와 결빙 등 여러 원인으로 생깁니다. 물이 흐르는 위치와 운전 상태를 함께 확인합니다.", signs:["실내기 아래로 물방울이 떨어짐","벽지나 바닥이 젖음","가동 후 일정 시간이 지나면 물이 샘"], checks:["드레인 배관 막힘·꺾임","배수 기울기와 연결부","실내기 결로·결빙 상태"], caution:"천장·벽체 내부 배관은 현장 접근 조건에 따라 작업 범위가 달라질 수 있습니다." },
  "outdoor-unit": { label:"실외기 수리", headline:"팬부터 압축기·제어부까지 확인합니다.", lead:"실외기 정지·과열·이상 소음", description:"실내기는 켜지지만 실외기가 돌지 않으면 팬, 모터, 압축기와 전기 제어부를 나눠 확인해야 합니다. 반복 가동은 멈추고 증상을 알려주세요.", signs:["실외기 팬이 움직이지 않음","큰 진동음이나 금속음이 남","잠시 돌다가 과열로 멈춤"], checks:["팬·모터 회전 상태","압축기와 전기 계통","기판·센서·통신 상태"], caution:"난간 밖이나 고소 위치처럼 안전 확보가 어려운 현장은 작업이 제한될 수 있습니다." },
  "error-code": { label:"에러코드", headline:"표시된 코드와 모델을 함께 확인합니다.", lead:"영문·숫자 오류 표시·램프 점멸", description:"같은 오류 코드도 제조사와 모델에 따라 의미가 다릅니다. 표시 내용을 기록하고 전원, 센서와 통신 계통을 차례로 확인합니다.", signs:["CH·E 등 문자가 화면에 표시됨","표시등이 일정한 횟수로 깜빡임","오류 후 작동이 멈추거나 반복 재시작"], checks:["제조사·정확한 모델명","표시 코드와 발생 시점","센서·통신·실외기 제어 상태"], caution:"코드만으로 부품 고장을 확정하지 않으며 현장 점검 후 작업 가능 여부를 안내합니다." },
  "not-starting": { label:"작동 불가", headline:"전원부터 수신부·제어 계통을 확인합니다.", lead:"전원이 안 켜짐·바로 꺼짐·반응 없음", description:"작동 불가는 차단기, 리모컨, 수신부, 기판 등 원인이 다양합니다. 안전을 위해 반복적으로 차단기를 올리기보다 현재 상태를 알려주세요.", signs:["리모컨을 눌러도 반응이 없음","켜졌다가 곧바로 꺼짐","차단기가 반복해서 내려감"], checks:["전원·차단기와 콘센트","리모컨·수신부","기판·배선과 보호장치"], caution:"전기 계통 이상이 의심되면 제품 전원을 끄고 상담해 주세요." },
  "not-cooling": { label:"냉방 불량", headline:"안 시원한 원인을 순서대로 확인합니다.", lead:"미지근한 바람·약한 냉방·온도 저하 없음", description:"안 시원한 증상은 필터 오염, 실외기 열교환, 냉매 부족과 압축기 문제 등에서 발생합니다. 한 항목으로 단정하지 않고 운전 상태를 확인합니다.", signs:["설정 온도까지 실내 온도가 내려가지 않음","바람은 나오지만 차갑지 않음","오래 켜도 냉방 효과가 약함"], checks:["필터·열교환기 상태","냉매 압력과 결빙 여부","실외기 팬·압축기 작동"], caution:"필터 관리만으로 해결되지 않으면 현장 점검이 필요할 수 있습니다." },
  noise: { label:"소음·진동", headline:"소리가 나는 위치와 운전 조건을 확인합니다.", lead:"덜덜거림·금속음·큰 진동", description:"소리 종류와 발생 위치에 따라 팬 이물질, 모터, 체결 부위나 압축기 등 점검 항목이 달라집니다. 가능하면 소리를 영상으로 남겨주세요.", signs:["실내기에서 덜덜거리는 소리","실외기에서 큰 진동이나 금속음","운전 시작·종료 때 비정상적인 충격음"], checks:["팬·모터와 이물질","체결 부위와 설치 수평","압축기·배관 진동 전달"], caution:"정상적인 열팽창음과 고장 소음은 현장 상태를 함께 확인해야 구분할 수 있습니다." },
  "system-type": { label:"시스템·천장형", headline:"기종과 설치 환경부터 확인합니다.", lead:"천장형·시스템 에어컨 작동 이상", description:"시스템·천장형은 실내기 수, 제어 방식과 실외기 구성이 제품마다 다릅니다. 모델명과 오류 코드를 확인해 작업 가능 여부부터 안내합니다.", signs:["특정 실내기만 냉방이 되지 않음","유선 리모컨에 오류가 표시됨","실외기가 돌지 않거나 반복 정지"], checks:["실내기·실외기 모델 구성","유선 리모컨 오류 코드","전원·통신·냉매 계통"], caution:"로켓에어컨은 설치·이전 및 분해 청소를 하지 않으며 기종에 따라 수리가 제한될 수 있습니다." },
  "wall-type": { label:"벽걸이형", headline:"벽걸이형 구조에 맞춰 점검합니다.", lead:"냉방 불량·누수·작동 오류", description:"벽걸이 에어컨은 배수 호스와 실내기 결로, 배관 연결부 상태를 함께 확인해야 합니다. 제품 전체와 누수 위치 사진이 있으면 상담에 도움이 됩니다.", signs:["송풍구 아래로 물이 떨어짐","바람은 나오지만 시원하지 않음","표시등이 깜빡이고 작동하지 않음"], checks:["필터·열교환기","배수 호스와 결로","냉매·실외기 운전 상태"], caution:"설치·이전과 분해 청소는 제공하지 않습니다." },
  "stand-type": { label:"스탠드형", headline:"스탠드형 냉방 계통을 확인합니다.", lead:"바람 약함·냉방 저하·오류 표시", description:"스탠드형은 흡입부와 열교환기, 센서와 실외기 작동 상태를 함께 확인합니다. 모델명과 화면의 오류 표시를 알려주세요.", signs:["토출 바람이 약하거나 미지근함","가동 중 오류가 표시됨","실외기가 돌지 않음"], checks:["흡입·열교환 상태","센서·제어부","냉매·실외기 계통"], caution:"모델과 부품 수급 여부에 따라 작업 가능 범위가 달라집니다." },
  "lg-repair": { label:"LG 에어컨", headline:"LG 모델명과 오류 표시를 확인합니다.", lead:"LG 벽걸이·스탠드형 수리 상담", description:"제품 측면 또는 하단의 모델명과 CH 계열 등 오류 표시를 알려주세요. 증상을 확인해 방문 전 작업 가능 여부를 안내합니다.", signs:["CH 문자가 표시되고 운전이 멈춤","냉방이 약하거나 실외기가 멈춤","실내기에서 물이 떨어짐"], checks:["정확한 모델명·제조연도","오류 코드와 발생 시점","냉매·실외기·제어 상태"], caution:"로켓에어컨은 LG전자 공식 서비스센터가 아니며 부품 수급에 따라 작업이 제한될 수 있습니다." },
  "samsung-repair": { label:"삼성 에어컨", headline:"삼성 모델과 오류 코드를 먼저 확인합니다.", lead:"삼성 벽걸이·스탠드형 수리 상담", description:"제품 모델명과 E·C 계열 등 화면에 표시된 오류를 알려주세요. 냉방, 누수와 실외기 증상을 확인해 작업 가능 여부를 안내합니다.", signs:["E·C 계열 오류가 표시됨","전원이 켜지지만 냉방이 되지 않음","실외기 정지 또는 이상 소음"], checks:["모델명과 오류 표시","실내기·실외기 통신","냉매·센서·제어 상태"], caution:"로켓에어컨은 삼성전자 공식 서비스센터가 아니며 기종과 부품에 따라 작업이 제한될 수 있습니다." },
  "other-brand": { label:"브랜드 에어컨", headline:"제조사와 모델부터 확인합니다.", lead:"브랜드별 에어컨 수리 가능 여부 상담", description:"제조사와 모델에 따라 부품 구조와 오류 체계가 다릅니다. 모델명, 증상과 오류 표시를 확인해 방문 전 작업 가능 여부를 안내합니다.", signs:["화면에 오류가 표시됨","냉방이 약하거나 작동하지 않음","부품 이상이 의심되는 소음 발생"], checks:["제조사·모델명","오류 표시와 증상","부품 수급·점검 가능 여부"], caution:"제조사 공식 서비스센터가 아니며 일부 기종은 작업이 제한될 수 있습니다." },
  "as-service": { label:"에어컨 AS", headline:"현재 증상과 수리 가능 범위를 확인합니다.", lead:"냉방·전원·누수·실외기 점검", description:"에어컨 AS를 찾을 때는 제품 모델과 현재 증상을 먼저 확인해야 합니다. 현장 상태를 점검하고 가능한 작업과 비용을 안내합니다.", signs:["냉방이 되지 않거나 약함","전원이 안 켜지거나 반복 정지","누수·소음·오류 표시 발생"], checks:["제품 형태와 모델명","증상 발생 시점","실내기·실외기 운전 상태"], caution:"제조사 무상보증이나 공식 서비스가 필요한 경우 해당 제조사 센터를 이용해야 합니다." },
  breakdown: { label:"에어컨 고장", headline:"멈춘 원인을 한 항목씩 확인합니다.", lead:"갑작스러운 고장·냉방 정지", description:"갑자기 멈춘 에어컨은 과열 보호, 전원, 센서, 실외기와 냉매 계통 등 여러 원인이 있을 수 있습니다. 증상을 확인한 뒤 필요한 작업만 안내합니다.", signs:["사용 중 갑자기 꺼짐","다시 켜도 같은 증상이 반복됨","이상음·냄새와 함께 작동 정지"], checks:["전원·보호장치","센서·제어부","냉매·실외기 상태"], caution:"타는 냄새나 스파크가 있었다면 즉시 전원을 끄고 상담해 주세요." },
  inspection: { label:"에어컨 점검", headline:"이상 징후와 운전 상태를 확인합니다.", lead:"냉방 성능·전원·실외기 상태 확인", description:"특정 부품을 미리 정하지 않고 현재 증상과 제품 운전 상태를 확인합니다. 점검 후 별도 진단이나 수리가 필요한 경우 작업 전 비용을 안내합니다.", signs:["예전보다 냉방 시간이 길어짐","간헐적으로 멈추거나 오류가 생김","실외기 소리와 열이 평소와 다름"], checks:["온도·송풍 상태","전원·센서·제어부","냉매 압력·실외기 운전"], caution:"기본 출장비는 30,000원이며 추가 점검·수리 비용은 작업 전 안내합니다." },
};

function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function getEntry(slug: string) {
  const decodedSlug = decodeSlug(slug);
  return seoKeywords.find((entry) => entry.slug === decodedSlug);
}
function getArea(slug: string) { return serviceAreas.find((area) => area.slug === slug); }

export function generateStaticParams() { return seoKeywords.map((entry) => ({ slug: entry.slug })); }

export async function generateMetadata({ params }: KeywordPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  const area = getArea(entry.regionSlug);
  const content = intentContent[entry.intent] ?? intentContent.repair;
  const title = `${entry.keyword} | 오늘 방문 로켓에어컨`;
  const description = `${area?.name ?? "수도권"} ${content.label} 출장 상담. ${content.lead}. 기본 출장비 3만원, 점검 후 작업 전 비용 안내.`;
  return { title, description, keywords: [entry.keyword, ...(area?.keywords ?? [])], alternates: { canonical: `/keyword/${entry.slug}` }, openGraph: { title, description, url: `/keyword/${entry.slug}`, type: "website" } };
}

export default async function KeywordPage({ params }: KeywordPageProps) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const area = getArea(entry.regionSlug);
  const detail = areaDetails[entry.regionSlug];
  if (!area || !detail) notFound();
  const content = intentContent[entry.intent] ?? intentContent.repair;
  const related = seoKeywords.filter((item) => item.regionSlug === entry.regionSlug && item.slug !== entry.slug).sort((a, b) => b.impressions - a.impressions).slice(0, 10);
  const sameIntent = seoKeywords.filter((item) => item.intent === entry.intent && item.regionSlug !== entry.regionSlug).sort((a, b) => b.impressions - a.impressions).slice(0, 6);
  const faqs = [
    [`${entry.keyword} 당일 방문이 가능한가요?`, `${detail.visitNote} 정확한 방문 시간은 전화 접수 후 안내드립니다.`],
    ["출장비와 수리비는 어떻게 안내되나요?", "기본 출장비는 30,000원이며 수리·부품·냉매 비용은 별도입니다. 점검·진단 및 수리 비용은 작업 전 안내드립니다."],
    ["누가 방문하나요?", "당일 방문·수리를 우선으로 운영합니다. 접수가 마감되거나 일정이 겹치는 경우 협력업체가 도급 방식으로 방문할 수 있으며 방문 전에 안내드립니다."],
    ["상담할 때 무엇을 알려주면 좋나요?", "제품 형태와 모델명, 현재 증상, 오류 코드와 방문 동을 알려주세요. 사진이 있으면 방문 전 확인에 도움이 됩니다."],
  ];
  const structuredData = {
    "@context":"https://schema.org",
    "@graph":[
      { "@type":"Service", name:entry.keyword, serviceType:content.label, provider:{ "@type":"Organization", name:"로켓에어컨", telephone:"+82-10-8022-5800", url:"https://rocketaircon.vercel.app" }, areaServed:{ "@type":"AdministrativeArea", name:area.name }, url:`https://rocketaircon.vercel.app/keyword/${encodeURIComponent(entry.slug)}` },
      { "@type":"BreadcrumbList", itemListElement:[{ "@type":"ListItem", position:1, name:"로켓에어컨", item:"https://rocketaircon.vercel.app" },{ "@type":"ListItem", position:2, name:`${area.label} 에어컨 수리`, item:`https://rocketaircon.vercel.app/area/${area.slug}` },{ "@type":"ListItem", position:3, name:entry.keyword, item:`https://rocketaircon.vercel.app/keyword/${encodeURIComponent(entry.slug)}` }] },
      { "@type":"FAQPage", mainEntity:faqs.map(([q,a])=>({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } })) },
    ],
  };

  return <main className="keyword-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(structuredData) }}/>
    <header className="site-header"><Link className="brand" href="/" aria-label="로켓에어컨 홈"><span className="brand-mark">R</span><span className="brand-copy"><b>로켓에어컨</b><small>오늘 접수 · 오늘 방문</small></span></Link><Link className="area-home-link" href={`/area/${area.slug}`}>{area.label} 지역안내</Link><a className="header-phone" href="tel:01080225800"><span>☎</span><b>010-8022-5800</b></a></header>
    <nav className="local-breadcrumb" aria-label="현재 위치"><Link href="/">홈</Link><span>›</span><Link href={`/area/${area.slug}`}>{area.label}</Link><span>›</span><b>{entry.keyword}</b></nav>
    <section className="keyword-hero"><div><p>{area.name} · {content.label}</p><h1>{entry.keyword}<br/><em>오늘 방문 상담</em></h1><span>{content.headline}</span><div className="local-actions"><a href="tel:01080225800">지금 전화 상담</a><a href="#check">확인 항목 보기</a></div></div><aside><small>기본 출장비</small><b>30,000원</b><p>점검·진단 및 수리 비용은 작업 전 안내드립니다.</p></aside></section>
    <section className="keyword-intro"><div><p>증상 안내</p><h2>{content.headline}</h2><b>{content.lead}</b><p>{content.description}</p></div><aside><small>{area.label} 출장 안내</small><p>{detail.context}</p><Link href={`/area/${area.slug}`}>{area.label} 전체 지역 안내 →</Link></aside></section>
    <section className="keyword-checks" id="check"><article><small>이럴 때 문의하세요</small><h2>현재 증상을<br/>확인해 주세요.</h2><ul>{content.signs.map((item)=><li key={item}>{item}</li>)}</ul></article><article><small>주요 확인 항목</small><h2>원인을 차례로<br/>살펴봅니다.</h2><ul>{content.checks.map((item)=><li key={item}>{item}</li>)}</ul></article><p>{content.caution}</p></section>
    <section className="local-process"><div><p>출장 진행 순서</p><h2>전화 접수부터<br/>작동 확인까지</h2></div><ol><li><b>01</b><span>모델·증상·방문 지역 확인</span></li><li><b>02</b><span>오늘 방문 가능 시간 안내</span></li><li><b>03</b><span>현장 상태와 원인 점검</span></li><li><b>04</b><span>비용 안내 후 작업 진행</span></li><li><b>05</b><span>냉방·작동 상태 확인</span></li></ol></section>
    <section className="keyword-faq"><div><p>{entry.keyword} FAQ</p><h2>출장 전에<br/>궁금한 점을 확인하세요.</h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</div></section>
    <section className="keyword-links"><p>{area.label} 관련 검색 안내</p><h2>같은 지역의 다른 증상도 확인하세요.</h2><div>{related.map((item)=><Link key={item.slug} href={`/keyword/${item.slug}`}>{item.keyword}</Link>)}</div><p className="other-region-label">다른 지역의 {content.label}</p><div>{sameIntent.map((item)=><Link key={item.slug} href={`/keyword/${item.slug}`}>{item.keyword}</Link>)}</div></section>
    <section className="contact area-contact"><div><p>{entry.keyword} 전화 상담</p><h2>지금 증상을 알려주세요.</h2><span>제품 모델, 현재 증상과 방문 동을 말씀해 주시면 상담이 빨라집니다.</span></div><div className="contact-actions"><a href="tel:01080225800"><small>바로 전화 상담</small><b>010-8022-5800</b></a></div></section>
    <footer><div className="brand footer-brand"><span className="brand-mark">R</span><span>로켓에어컨</span></div><div><p>{area.label} 에어컨 수리 · 냉매 점검 · 누수 · 실외기 점검</p><p>기본 출장비 30,000원 · 점검·진단 비용 발생 시 사전 안내</p><p>© 2026 ROCKET AIRCON. ALL RIGHTS RESERVED.</p></div></footer>
    <a className="floating-call" href="tel:01080225800"><span>☎</span><b>누르면 바로 전화 연결</b></a>
  </main>;
}
