export interface Evidence {
  source_title: string
  url: string
}

export interface InfluenceChain {
  politician: string
  policy: string
  industry_or_sector: string
  companies: string[]
  impact_description: string
  evidence: Evidence[]
}

export interface AnalysisReport {
  report_title: string
  time_range: string
  influence_chains: InfluenceChain[]
  notes?: string
}

export interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export interface GraphNode {
  id: string
  type: "input" | "policy" | "sector" | "enterprise"
  label: string
  data: {
    description?: string
    evidence?: Evidence[]
    stockData?: StockData
  }
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  data: {
    description?: string
    evidence?: Evidence[]
  }
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
