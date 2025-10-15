"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Wand2, Copy, Check, RefreshCw, Sparkles } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function GeneratePanel() {
  const [brandInfo, setBrandInfo] = useState("")
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAds, setGeneratedAds] = useState<any[]>([])
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedAds([
        {
          id: 1,
          headline: "Transform Your Body in 30 Days",
          description: "Join 10,000+ members achieving real results with our proven fitness program",
          score: 92,
        },
        {
          id: 2,
          headline: "Get Fit Fast - Money Back Guarantee",
          description: "Science-backed workouts designed by certified trainers. Start your journey today",
          score: 88,
        },
        {
          id: 3,
          headline: "Premium Fitness at Your Fingertips",
          description: "Personalized training plans that adapt to your goals. Free trial available",
          score: 85,
        },
      ])
      setIsGenerating(false)
    }, 2500)
  }

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="brand-info">Brand Information</Label>
              <Textarea
                id="brand-info"
                placeholder="Tell us about your brand, products, and unique value proposition..."
                value={brandInfo}
                onChange={(e) => setBrandInfo(e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>
            <div>
              <Label htmlFor="tone">Tone of Voice</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerate} disabled={isGenerating || !brandInfo} className="w-full gap-2">
              {isGenerating ? (
                <>
                  <Spinner className="w-4 h-4" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate Ads
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-3 text-sm">Quick Tips</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Include your unique selling points</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Mention target audience if specific</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Add any special offers or guarantees</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Generated Ads */}
      <div className="lg:col-span-2 space-y-4">
        {generatedAds.length === 0 ? (
          <Card className="p-12 flex flex-col items-center justify-center text-center h-full">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Wand2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready to Generate Ads</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Fill in your brand information and click generate to create AI-powered ad copies based on your research
            </p>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Generated Ad Copies</h3>
              <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
            {generatedAds.map((ad) => (
              <Card key={ad.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="w-3 h-3" />
                    Quality Score: {ad.score}%
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(`${ad.headline}\n${ad.description}`, ad.id)}
                  >
                    {copiedId === ad.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <h4 className="font-semibold text-lg mb-2">{ad.headline}</h4>
                <p className="text-sm text-muted-foreground">{ad.description}</p>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
