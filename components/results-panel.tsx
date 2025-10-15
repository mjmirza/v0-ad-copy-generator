"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Search, ExternalLink, Copy, Check, TrendingUp, Eye } from "lucide-react"

interface ResultsPanelProps {
  conversationData: {
    location?: string
    adCount?: number
    includeYouTube?: boolean
    niche?: string
  }
}

const mockAds = [
  {
    id: 1,
    headline: "Transform Your Fitness Journey Today",
    description: "Join 10,000+ members achieving their goals with personalized training plans",
    platform: "Google Search",
    impressions: "125K",
    ctr: "3.2%",
    company: "FitLife Pro",
  },
  {
    id: 2,
    headline: "Get Fit in 30 Days - Money Back Guarantee",
    description: "Science-backed workout programs designed by certified trainers",
    platform: "Google Display",
    impressions: "89K",
    ctr: "2.8%",
    company: "QuickFit",
  },
  {
    id: 3,
    headline: "Premium Gym Equipment at Home",
    description: "Free shipping on orders over $500. Transform your home into a gym",
    platform: "YouTube",
    impressions: "210K",
    ctr: "4.1%",
    company: "HomeGym Elite",
  },
]

export function ResultsPanel({ conversationData }: ResultsPanelProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPlatform, setFilterPlatform] = useState("all")
  const [copiedId, setCopiedId] = useState<number | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
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
        <h3 className="text-lg font-semibold mb-2">Scraping ads...</h3>
        <p className="text-sm text-muted-foreground">
          Analyzing {conversationData.adCount} ads from {conversationData.location}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Ads</p>
              <p className="text-2xl font-bold">{conversationData.adCount || 0}</p>
            </div>
            <Search className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg CTR</p>
              <p className="text-2xl font-bold">3.4%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Impressions</p>
              <p className="text-2xl font-bold">424K</p>
            </div>
            <Eye className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Platforms</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <ExternalLink className="w-8 h-8 text-muted-foreground/50" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search ads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterPlatform} onValueChange={setFilterPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="search">Google Search</SelectItem>
            <SelectItem value="display">Google Display</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ads List */}
      <div className="space-y-4">
        {mockAds.map((ad) => (
          <Card key={ad.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{ad.headline}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {ad.platform}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{ad.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>
                    <strong className="text-foreground">{ad.company}</strong>
                  </span>
                  <span>•</span>
                  <span>{ad.impressions} impressions</span>
                  <span>•</span>
                  <span className="text-success font-medium">{ad.ctr} CTR</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(`${ad.headline}\n${ad.description}`, ad.id)}
                >
                  {copiedId === ad.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
