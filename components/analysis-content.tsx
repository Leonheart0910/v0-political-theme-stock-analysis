"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { RelationshipGraph } from "@/components/relationship-graph"
import { mockAnalysisData, mockStockData } from "@/lib/mock-data"
import type { AnalysisReport, GraphData, GraphNode, GraphEdge } from "@/lib/types"
import { AlertCircle } from "lucide-react"

export function AnalysisContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") || ""
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalysisReport | null>(null)
  const [graphData, setGraphData] = useState<GraphData | null>(null)

  useEffect(() => {
    // Simulate API call to FastAPI backend
    const fetchAnalysis = async () => {
      setLoading(true)

      // In production, this would be:
      // const response = await fetch(`/api/analyze?query=${encodeURIComponent(query)}`);
      // const result = await response.json();

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Use mock data
      setData(mockAnalysisData)

      // Transform data into graph format
      const graphData = transformToGraphData(mockAnalysisData, query)
      setGraphData(graphData)

      setLoading(false)
    }

    if (query) {
      fetchAnalysis()
    }
  }, [query])

  if (!query) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">검색어를 입력해주세요</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-4">
          <Spinner className="w-12 h-12 mx-auto" />
          <div className="space-y-2">
            <p className="font-medium">관계도를 분석하고 있습니다...</p>
            <p className="text-sm text-muted-foreground">정책, 산업, 기업 간의 연결고리를 찾는 중입니다</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data || !graphData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <p className="text-muted-foreground">분석 결과를 불러올 수 없습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold">{data.report_title}</h2>
          <Badge variant="secondary" className="text-xs">
            {data.time_range}
          </Badge>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">{query}</span>에 대한 정치·경제 관계도 분석 결과입니다. 노드를
          클릭하면 상세 정보와 근거를 확인할 수 있습니다.
        </p>
      </div>

      {/* Graph Visualization */}
      <Card className="p-4 md:p-6">
        <RelationshipGraph data={graphData} />
      </Card>

      {/* Notes */}
      {data.notes && (
        <Card className="p-4 bg-muted/50 border-muted">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">참고사항:</span> {data.notes}
          </p>
        </Card>
      )}
    </div>
  )
}

function transformToGraphData(report: AnalysisReport, inputQuery: string): GraphData {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  // Create input node
  const inputNodeId = "input-0"
  nodes.push({
    id: inputNodeId,
    type: "input",
    label: inputQuery,
    data: {},
  })

  // Track unique policies, sectors, and companies
  const policyMap = new Map<string, string>()
  const sectorMap = new Map<string, string>()
  const companyMap = new Map<string, string>()

  report.influence_chains.forEach((chain, chainIndex) => {
    // Create or get policy node
    let policyId = policyMap.get(chain.policy)
    if (!policyId) {
      policyId = `policy-${policyMap.size}`
      policyMap.set(chain.policy, policyId)
      nodes.push({
        id: policyId,
        type: "policy",
        label: chain.policy,
        data: {
          description: chain.impact_description,
          evidence: chain.evidence,
        },
      })

      // Edge from input to policy
      edges.push({
        id: `edge-input-${policyId}`,
        source: inputNodeId,
        target: policyId,
        data: {},
      })
    }

    // Create or get sector node
    let sectorId = sectorMap.get(chain.industry_or_sector)
    if (!sectorId) {
      sectorId = `sector-${sectorMap.size}`
      sectorMap.set(chain.industry_or_sector, sectorId)
      nodes.push({
        id: sectorId,
        type: "sector",
        label: chain.industry_or_sector,
        data: {
          description: chain.impact_description,
          evidence: chain.evidence,
        },
      })
    }

    // Edge from policy to sector
    const policySectorEdgeId = `edge-${policyId}-${sectorId}`
    if (!edges.find((e) => e.id === policySectorEdgeId)) {
      edges.push({
        id: policySectorEdgeId,
        source: policyId,
        target: sectorId,
        data: {
          description: chain.impact_description,
          evidence: chain.evidence,
        },
      })
    }

    // Create company nodes
    chain.companies.forEach((company, companyIndex) => {
      let companyId = companyMap.get(company)
      if (!companyId) {
        companyId = `company-${companyMap.size}`
        companyMap.set(company, companyId)
        nodes.push({
          id: companyId,
          type: "enterprise",
          label: company,
          data: {
            description: chain.impact_description,
            evidence: chain.evidence,
            stockData: mockStockData[company],
          },
        })
      }

      // Edge from sector to company
      const sectorCompanyEdgeId = `edge-${sectorId}-${companyId}`
      if (!edges.find((e) => e.id === sectorCompanyEdgeId)) {
        edges.push({
          id: sectorCompanyEdgeId,
          source: sectorId,
          target: companyId,
          data: {
            description: chain.impact_description,
            evidence: chain.evidence,
          },
        })
      }
    })
  })

  return { nodes, edges }
}
