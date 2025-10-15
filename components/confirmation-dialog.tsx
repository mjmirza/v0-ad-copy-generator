"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Sparkles, MapPin, Hash, Youtube, Target } from "lucide-react"

interface ExtractedData {
  location?: string
  adCount?: number
  includeYouTube?: boolean
  niche?: string
  rawInput: string
}

interface ConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  extractedData: ExtractedData
  onConfirm: (data: ExtractedData) => void
}

export function ConfirmationDialog({ open, onOpenChange, extractedData, onConfirm }: ConfirmationDialogProps) {
  const [formData, setFormData] = useState<ExtractedData>(extractedData)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setFormData(extractedData)
  }, [extractedData])

  const handleConfirm = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onConfirm(formData)
      setIsProcessing(false)
    }, 1000)
  }

  const missingFields = []
  if (!formData.location) missingFields.push("location")
  if (!formData.niche) missingFields.push("niche")
  if (!formData.adCount) missingFields.push("ad count")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-lg font-semibold">Confirm Your Search</DialogTitle>
          <DialogDescription className="text-sm">
            {missingFields.length > 0
              ? `Please fill in the missing details to continue.`
              : `Review and confirm the extracted information.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Niche/Industry */}
          <div className="space-y-1.5">
            <Label htmlFor="niche" className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Target className="w-3.5 h-3.5" />
              Industry / Niche
            </Label>
            <Input
              id="niche"
              value={formData.niche || ""}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              placeholder="e.g., Fitness, E-commerce"
              className="h-9 text-sm"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label htmlFor="location" className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., France, United States"
              className="h-9 text-sm"
            />
          </div>

          {/* Ad Count */}
          <div className="space-y-1.5">
            <Label htmlFor="adCount" className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Hash className="w-3.5 h-3.5" />
              Number of Ads
            </Label>
            <Input
              id="adCount"
              type="number"
              value={formData.adCount || ""}
              onChange={(e) => setFormData({ ...formData, adCount: Number.parseInt(e.target.value) || undefined })}
              placeholder="e.g., 100"
              min="1"
              max="1000"
              className="h-9 text-sm"
            />
          </div>

          {/* YouTube Ads - More compact */}
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-muted/20">
            <div className="flex items-center gap-2.5">
              <Youtube className="w-4 h-4 text-primary shrink-0" />
              <Label htmlFor="youtube" className="text-sm font-medium cursor-pointer">
                Include YouTube Ads
              </Label>
            </div>
            <Switch
              id="youtube"
              checked={formData.includeYouTube || false}
              onCheckedChange={(checked) => setFormData({ ...formData, includeYouTube: checked })}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing} className="h-9 text-sm">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!formData.location || !formData.niche || !formData.adCount || isProcessing}
            className="h-9 text-sm min-w-[120px]"
          >
            {isProcessing ? (
              <>
                <Sparkles className="w-3.5 h-3.5 mr-2 animate-spin" />
                Starting...
              </>
            ) : (
              "Start Scraping"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
