"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Zap, MessageSquare } from "lucide-react"

export function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Performance Insights</h2>
        <p className="text-muted-foreground">Key patterns and trends from your scraped ads</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Top Performing Headlines</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Headlines with "Transform" and "Money Back Guarantee" show 45% higher CTR
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Transform</Badge>
                <Badge variant="secondary">Guarantee</Badge>
                <Badge variant="secondary">Free</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Audience Targeting</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Most successful ads target 25-45 age group with fitness goals
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">25-45 years</Badge>
                <Badge variant="secondary">Health conscious</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-chart-2" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Call-to-Action Patterns</h3>
              <p className="text-sm text-muted-foreground mb-3">Action-oriented CTAs with urgency perform 38% better</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Start Now</Badge>
                <Badge variant="secondary">Join Today</Badge>
                <Badge variant="secondary">Limited Time</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-chart-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Messaging Themes</h3>
              <p className="text-sm text-muted-foreground mb-3">Personalization and social proof are dominant themes</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Personalized</Badge>
                <Badge variant="secondary">Social Proof</Badge>
                <Badge variant="secondary">Results-focused</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recommendations</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
            <div>
              <p className="font-medium text-sm">Use power words in headlines</p>
              <p className="text-sm text-muted-foreground">
                Words like "Transform", "Proven", and "Guaranteed" increase engagement
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
            <div>
              <p className="font-medium text-sm">Include specific numbers</p>
              <p className="text-sm text-muted-foreground">
                Ads with specific metrics (30 days, 10,000+ members) perform better
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
            <div>
              <p className="font-medium text-sm">Add urgency and scarcity</p>
              <p className="text-sm text-muted-foreground">
                Limited-time offers and exclusive access drive immediate action
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
