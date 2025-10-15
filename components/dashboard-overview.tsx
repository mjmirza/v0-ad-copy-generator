"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import {
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Globe,
  Languages,
  Sparkles,
  Play,
  FileText,
} from "lucide-react"

interface DashboardOverviewProps {
  conversationData: {
    location?: string
    adCount?: number
    includeYouTube?: boolean
    niche?: string
  }
  onNewSearch: () => void
}

const mockAds = [
  {
    id: 1,
    title: "Transform Your Marketing with AI",
    description: "Discover how AI-powered tools can revolutionize your marketing strategy",
    platform: "Google Search",
    status: "Active",
    detectedDate: "10 months ago",
  },
  {
    id: 2,
    title: "Free Demo: AdTech Platform",
    description: "See how leading brands use our platform to scale their advertising",
    platform: "LinkedIn",
    status: "Active",
    detectedDate: "10 months ago",
  },
  {
    id: 3,
    title: "ROI Dashboard Preview",
    description: "Get all your marketing metrics in one beautiful dashboard",
    platform: "Instagram",
    status: "Active",
    detectedDate: "10 months ago",
  },
  {
    id: 4,
    title: "Webinar: Future of Marketing Tech",
    description: "Join our webinar to learn about the latest marketing innovations",
    platform: "LinkedIn",
    status: "Active",
    detectedDate: "10 months ago",
  },
  {
    id: 5,
    title: "Holiday Special: 50% OFF First Year",
    description: "Limited time offer for new customers. Transform your marketing today",
    platform: "Google Search",
    status: "Removed",
    detectedDate: "10 months ago",
  },
  {
    id: 6,
    title: "Black Friday Special",
    description: "Biggest discount of the year! 50% off annual plans. Offer ends soon",
    platform: "Image",
    status: "Removed",
    detectedDate: "10 months ago",
  },
]

export function DashboardOverview({ conversationData, onNewSearch }: DashboardOverviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [durationFilter, setDurationFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Spinner className="w-8 h-8 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Loading dashboard...</h3>
        <p className="text-sm text-muted-foreground">Preparing your ad intelligence</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Company Header Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">Gonto</h2>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Active</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Google Advertising ID
                </p>
                <p className="font-mono text-xs">ARR2131651028901803</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Industry & Niche
                </p>
                <p className="font-medium">{conversationData.niche || "Legal Services"}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Target Countries
                </p>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">
                    {conversationData.location || "FR"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    DE
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ES
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    IT
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5" />
                  Target Languages
                </p>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs">
                    EN
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    DE
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ES
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    IT
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={onNewSearch} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Scrape Google Ads
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Total Ads Detected</p>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mb-1">{conversationData.adCount || 7}</p>
          <p className="text-xs text-muted-foreground">In total (including inactive)</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Last Scan</p>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mb-1">9 months ago</p>
          <p className="text-xs text-muted-foreground">Competitor last scanned</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Reports Generated</p>
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mb-1">0</p>
          <p className="text-xs text-muted-foreground">Available reports</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Analysis Status</p>
            <Play className="w-4 h-4 text-primary" />
          </div>
          <p className="text-3xl font-bold mb-1">Running</p>
          <p className="text-xs text-muted-foreground">Real-time analysis</p>
        </Card>
      </div>

      {/* Ad Timeline Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Ad Timeline</h3>
            <p className="text-sm text-muted-foreground">Chronological history of detected ads</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Input type="text" placeholder="Search ads" className="col-span-1" />
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="col-span-1"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="col-span-1"
          />
          <div className="flex gap-2">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="google">Google Search</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
              </SelectContent>
            </Select>
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="All Durations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="removed">Removed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAds.map((ad) => (
            <Card key={ad.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="mb-3">
                <h4 className="font-semibold mb-2 text-sm leading-tight">{ad.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{ad.description}</p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  {ad.platform}
                </Badge>
                <Badge
                  variant={ad.status === "Active" ? "default" : "secondary"}
                  className={ad.status === "Active" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                >
                  {ad.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Detected {ad.detectedDate}</span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleCopy(`${ad.title}\n${ad.description}`, ad.id)}
                  >
                    {copiedId === ad.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Insights & Trends</h3>
          <p className="text-sm text-muted-foreground mb-6">Key performance indicators and strategic patterns</p>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h4 className="font-semibold text-sm">Publishing Frequency</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ads per week</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">4.2</span>
                    <span className="text-xs text-muted-foreground">2.8</span>
                    <span className="text-xs text-success flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +50%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average ad lifespan (days)</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">3h</span>
                    <span className="text-xs text-muted-foreground">4.2</span>
                    <span className="text-xs text-destructive flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      -17%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h4 className="font-semibold text-sm">Message Types & Content</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Promotional message percentage</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">60%</span>
                    <span className="text-xs text-success">+14%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">vs previous period</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Educational content percentage</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">25%</span>
                    <span className="text-xs text-destructive">-4%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">vs previous period</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h4 className="font-semibold text-sm">Budget Estimates</h4>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">$45,000</span>
                <span className="text-sm text-success">+8%</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Estimated monthly ad spend</p>
                <p className="text-xs text-muted-foreground">Previous: $38,000</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Latest Reports</h3>
          <p className="text-sm text-muted-foreground mb-6">AI-generated insights and analysis</p>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-medium mb-1">No reports available</p>
            <p className="text-xs text-muted-foreground mb-4">Reports will appear here once generated</p>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              Browse All Reports
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
