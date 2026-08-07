export type LocalService = {
  slug: string;
  label: string;
  title: string;
  description: string;
  checks: string[];
};

export const localServices: LocalService[] = [
  { slug: "repair", label: "에어컨 수리", title: "증상에 맞춰 원인부터 확인합니다", description: "냉방 불량, 작동 불가, 누수와 소음 등 현재 증상을 듣고 필요한 부분을 순서대로 점검합니다.", checks: ["제품 형태와 모델명", "증상이 시작된 시점", "실내기·실외기 작동 상태"] },
  { slug: "gas-charge", label: "에어컨 가스충전", title: "충전 전에 부족한 원인을 살핍니다", description: "냉매는 자연스럽게 계속 소모되는 항목이 아닙니다. 압력과 운전 상태를 확인한 뒤 필요한 작업을 안내합니다.", checks: ["냉매 압력", "배관 연결부", "기종별 냉매 종류"] },
  { slug: "refrigerant", label: "에어컨 냉매충전", title: "냉매량과 누설 가능성을 함께 확인합니다", description: "찬바람이 약하거나 배관에 성에가 생기는 경우 냉매만 보충하지 않고 관련 원인을 함께 살핍니다.", checks: ["토출 온도", "배관 성에", "실외기 운전 상태"] },
  { slug: "leak", label: "에어컨 누수", title: "물이 생기는 위치부터 확인합니다", description: "실내기 아래, 벽면 또는 배관 주변 등 물이 보이는 위치에 따라 배수와 결로 상태를 점검합니다.", checks: ["드레인 배관 막힘", "배수 기울기", "실내기 결로"] },
  { slug: "outdoor-unit", label: "에어컨 실외기 수리", title: "실외기 정지와 이상음을 점검합니다", description: "실내기는 켜지지만 찬바람이 없거나 실외기 팬이 돌지 않는 경우 전기·제어 계통을 포함해 확인합니다.", checks: ["팬·모터 작동", "압축기 운전", "전기·제어부"] },
  { slug: "not-cooling", label: "에어컨 안 시원함", title: "약해진 냉방의 원인을 차례로 찾습니다", description: "바람은 나오지만 설정 온도까지 내려가지 않을 때 필터, 냉매와 실외기 상태를 함께 확인합니다.", checks: ["바람 세기와 온도", "필터·열교환기", "냉매·실외기 상태"] },
  { slug: "not-starting", label: "에어컨 안 켜짐", title: "전원부터 제어부까지 순서대로 확인합니다", description: "버튼을 눌러도 반응이 없거나 켜졌다가 바로 꺼지는 증상을 안전한 범위에서 점검합니다.", checks: ["전원·차단기", "리모컨·수신부", "기판·전기 계통"] },
  { slug: "noise", label: "에어컨 소음", title: "소리가 나는 위치와 조건을 확인합니다", description: "실내기 또는 실외기에서 평소와 다른 소리와 진동이 생기면 가동 시점과 발생 위치를 살핍니다.", checks: ["팬·모터", "체결 부위", "진동 전달 여부"] },
  { slug: "inspection", label: "에어컨 점검", title: "필요한 부분만 확인하고 안내합니다", description: "같은 증상도 원인이 다를 수 있어 제품과 현장 상태를 확인한 뒤 점검 결과를 설명합니다.", checks: ["모델명·사용 연수", "오류 표시", "설치 환경"] },
  { slug: "lg-repair", label: "LG 에어컨 수리", title: "LG 모델명과 오류 표시를 확인합니다", description: "벽걸이형과 스탠드형을 중심으로 모델명, CH 오류 표시와 현재 증상을 확인해 작업 가능 여부를 안내합니다.", checks: ["제품 모델명", "CH 오류 코드", "실내기·실외기 상태"] },
  { slug: "samsung-repair", label: "삼성 에어컨 수리", title: "삼성 모델과 표시 코드를 확인합니다", description: "제품 모델명과 C 오류 표시, 냉방·누수·실외기 증상을 확인한 뒤 점검 가능 범위를 안내합니다.", checks: ["제품 모델명", "C 오류 코드", "운전 중 증상"] },
  { slug: "system-type", label: "시스템 에어컨 수리", title: "실내기와 실외기 구성을 함께 확인합니다", description: "시스템형은 연결된 실내기 수와 오류 표시, 실외기 상태에 따라 점검 범위가 달라질 수 있습니다.", checks: ["실내기 수", "모델명·오류 코드", "공동 운전 상태"] },
];

export type ErrorCode = { brand: "lg" | "samsung"; brandLabel: "LG" | "삼성"; code: string };

const lgCodes = ["CH01","CH02","CH03","CH04","CH05","CH06","CH07","CH09","CH10","CH21","CH22","CH23","CH24","CH26","CH27","CH29","CH32","CH34","CH35","CH36","CH38","CH40","CH41","CH44","CH45"];
const samsungCodes = ["C101","C102","C121","C122","C154","C201","C202","C203","C221","C237","C251","C416","C422","C425","C440","C441","C458","C461","C462","C464","C465","C466","C467","C469","C470"];

export const errorCodes: ErrorCode[] = [
  ...lgCodes.map((code) => ({ brand: "lg" as const, brandLabel: "LG" as const, code })),
  ...samsungCodes.map((code) => ({ brand: "samsung" as const, brandLabel: "삼성" as const, code })),
];
