export type ServiceArea = {
  slug: string;
  name: string;
  label: string;
  note: string;
  keywords: string[];
};

export const serviceAreas: ServiceArea[] = [
  { slug:"incheon", name:"인천광역시", label:"인천", note:"강화군과 영종도는 출장 지역에서 제외됩니다.", keywords:["인천에어컨수리","인천에어컨가스충전","인천에어컨냉매충전","인천에어컨누수"] },
  { slug:"bucheon", name:"부천시", label:"부천", note:"부천 전 지역의 방문 가능 일정을 확인해 안내합니다.", keywords:["부천에어컨수리","부천에어컨가스충전","부천에어컨냉매충전","부천에어컨누수"] },
  { slug:"bupyeong", name:"인천 부평구", label:"부평", note:"부평구 접수 시간과 이동 일정을 확인해 방문합니다.", keywords:["부평에어컨수리","부평에어컨가스충전","부평에어컨누수","부평에어컨실외기수리"] },
  { slug:"siheung", name:"시흥시", label:"시흥", note:"시흥시 현장 위치에 맞춰 가장 빠른 시간을 안내합니다.", keywords:["시흥에어컨수리","시흥에어컨가스충전","시흥에어컨AS","시흥에어컨물떨어짐"] },
  { slug:"ansan", name:"안산시", label:"안산", note:"안산시 에어컨 고장과 실외기 증상을 함께 확인합니다.", keywords:["안산에어컨수리","안산에어컨가스충전","안산에어컨실외기수리","안산에어컨냉매충전"] },
  { slug:"gunpo", name:"군포시", label:"군포", note:"군포시 방문 전 에어컨 형태와 증상을 먼저 확인합니다.", keywords:["군포에어컨수리","군포에어컨가스충전","군포에어컨실외기수리","군포에어컨점검"] },
  { slug:"gwangmyeong", name:"광명시", label:"광명", note:"광명시 냉방 불량과 작동 문제를 순서대로 점검합니다.", keywords:["광명에어컨수리","광명에어컨가스충전","광명에어컨AS","광명에어컨고장"] },
  { slug:"guro", name:"서울 구로구", label:"구로", note:"구로구 주택과 소형 사업장의 에어컨 증상을 상담합니다.", keywords:["구로에어컨수리","구로에어컨가스충전","구로에어컨AS","구로에어컨냉매충전"] },
  { slug:"gangseo", name:"서울 강서구", label:"강서", note:"강서구 냉방 불량은 냉매와 실외기 상태를 함께 확인합니다.", keywords:["강서구에어컨수리","강서구에어컨가스충전","강서구에어컨냉매충전","강서구에어컨물떨어짐"] },
  { slug:"eunpyeong", name:"서울 은평구", label:"은평", note:"은평구 방문 시 제품 상태와 현장 환경을 먼저 살핍니다.", keywords:["은평구에어컨수리","은평구에어컨가스충전","은평구에어컨냉매충전","은평구에어컨고장"] },
  { slug:"yangcheon", name:"서울 양천구", label:"양천", note:"양천구 에어컨 수리와 냉매 관련 증상을 상담합니다.", keywords:["양천구에어컨수리","양천구에어컨가스충전","양천구에어컨냉매충전","양천구에어컨점검"] },
  { slug:"yeongdeungpo", name:"서울 영등포구", label:"영등포", note:"영등포구 가정용과 소형 업소용 에어컨을 점검합니다.", keywords:["영등포에어컨수리","영등포에어컨AS","영등포구에어컨가스충전","영등포에어컨냉매충전"] },
  { slug:"dongjak", name:"서울 동작구", label:"동작", note:"동작구 누수와 냉방 불량 원인을 차례대로 확인합니다.", keywords:["동작구에어컨수리","동작구에어컨AS","동작구에어컨가스충전","동작구에어컨누수"] },
  { slug:"geumcheon", name:"서울 금천구", label:"금천", note:"금천구 에어컨 작동 불가와 누수 증상을 상담합니다.", keywords:["금천구에어컨수리","금천구에어컨AS","금천구에어컨가스충전","금천구에어컨누수"] },
  { slug:"anyang", name:"안양시", label:"안양", note:"안양시 접수 현황을 확인해 가장 빠른 방문 시간을 안내합니다.", keywords:["안양에어컨수리","안양에어컨가스충전","안양에어컨냉매충전","안양에어컨AS"] },
  { slug:"gwanak", name:"서울 관악구", label:"관악", note:"관악구 에어컨 고장과 누수 상태를 현장에서 확인합니다.", keywords:["관악구에어컨수리","관악구에어컨AS","관악구에어컨가스충전","관악구에어컨누수"] },
  { slug:"mapo", name:"서울 마포구", label:"마포", note:"마포구 냉방 불량은 충전 전 부족 원인부터 확인합니다.", keywords:["마포에어컨수리","마포구에어컨가스충전","마포에어컨고장","마포구에어컨냉매충전"] },
  { slug:"seodaemun", name:"서울 서대문구", label:"서대문", note:"서대문구 방문 전 제품 형태와 오류 증상을 확인합니다.", keywords:["서대문구에어컨수리","서대문에어컨수리","서대문구에어컨가스충전","서대문구에어컨점검"] },
  { slug:"yongsan", name:"서울 용산구", label:"용산", note:"용산구 에어컨 수리와 냉매 관련 증상을 함께 점검합니다.", keywords:["용산에어컨수리","용산구에어컨가스충전","용산에어컨냉매충전","용산구에어컨수리"] },
];

export const serviceAreaNames = serviceAreas.map((area) => area.label).join(" · ");
