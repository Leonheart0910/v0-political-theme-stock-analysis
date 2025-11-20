import type { AnalysisReport, StockData } from "./types"

export const mockStockData: Record<string, StockData> = {
  KEPCO: {
    symbol: "015760",
    price: 23450,
    change: -350,
    changePercent: -1.47,
  },
  POSCO: {
    symbol: "005490",
    price: 385000,
    change: 5500,
    changePercent: 1.45,
  },
  "Celltrion Healthcare": {
    symbol: "091990",
    price: 67800,
    change: 2100,
    changePercent: 3.2,
  },
  동신건설: {
    symbol: "025950",
    price: 8920,
    change: 450,
    changePercent: 5.31,
  },
  "SK Group": {
    symbol: "034730",
    price: 156000,
    change: -2300,
    changePercent: -1.45,
  },
}

export const mockAnalysisData: AnalysisReport = {
  report_title: "이재명의 정치·경제·기업 연결성 분석",
  time_range: "2018–2025",
  influence_chains: [
    {
      politician: "이재명",
      policy: "재생에너지 정책",
      industry_or_sector: "에너지/철강",
      companies: ["KEPCO", "POSCO"],
      impact_description:
        "이재명 배우자가 KEPCO와 POSCO 주식을 보유하고 있어 에너지 및 철강 부문과 간접적인 재정적 연결고리를 나타냅니다.",
      evidence: [
        {
          source_title: "이재명 2023 재산공개 보고서",
          url: "https://www.ethics.go.kr/disclosure/2023/lee_jae_myung.pdf",
        },
      ],
    },
    {
      politician: "이재명",
      policy: "바이오테크 R&D 보조금",
      industry_or_sector: "바이오제약",
      companies: ["Celltrion Healthcare"],
      impact_description:
        "이재명의 캠페인은 셀트리온과 연결된 로비스트와 간접적인 관계가 있으며, R&D 보조금 옹호 이후 바이오테크 주식 급등과 시기가 일치합니다.",
      evidence: [
        {
          source_title: "뉴스타파: 이재명의 바이오제약 관계",
          url: "https://www.newstapa.org/article/lee-celltrion",
        },
      ],
    },
    {
      politician: "이재명",
      policy: "지역 개발 프로젝트",
      industry_or_sector: "건설",
      companies: ["동신건설"],
      impact_description: "이재명의 지역 개발 정책은 건설 회사인 동신건설의 주가 상승과 연결되어 있습니다.",
      evidence: [
        {
          source_title: "이재명 관련주, 이재명 테마주 한 장으로 알아보기",
          url: "https://jjeongddol.tistory.com/54",
        },
      ],
    },
    {
      politician: "이재명",
      policy: "지역 개발 프로젝트",
      industry_or_sector: "건설/컨설팅",
      companies: ["SK Group"],
      impact_description: "이재명의 전 보좌관이 경기도 프로젝트에 대해 SK그룹에 자문하는 컨설팅 회사를 설립했습니다.",
      evidence: [
        {
          source_title: "KBS 특별 보고서: PolicyLink와 SK그룹",
          url: "https://news.kbs.co.kr/politics/policylink_2023",
        },
      ],
    },
  ],
  notes: "일부 연결은 간접적이거나 추측적입니다(예: 셀트리온 주가 급등 시기). 정책 대가성의 직접적인 증거는 없습니다.",
}
