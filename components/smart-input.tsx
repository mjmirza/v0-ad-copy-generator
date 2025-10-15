"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Mic, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { NavigationBar } from "@/components/navigation-bar"

interface ExtractedData {
  location?: string
  adCount?: number
  includeYouTube?: boolean
  niche?: string
  rawInput: string
}

interface SmartInputProps {
  onComplete: (data: ExtractedData) => void
}

export function SmartInput({ onComplete }: SmartInputProps) {
  const [input, setInput] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const extractInformation = (text: string): ExtractedData => {
    const data: ExtractedData = {
      rawInput: text,
    }

    const locationPatterns = [
      /(?:from|in|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
      /(France|United States|UK|Germany|Spain|Italy|Canada|Australia)/i,
    ]
    for (const pattern of locationPatterns) {
      const match = text.match(pattern)
      if (match) {
        data.location = match[1] || match[0]
        break
      }
    }

    const nichePatterns = [
      /(?:fitness|e-commerce|saas|tech|fashion|food|travel|real estate|healthcare|education|finance)/i,
    ]
    for (const pattern of nichePatterns) {
      const match = text.match(pattern)
      if (match) {
        data.niche = match[0]
        break
      }
    }

    const countMatch = text.match(/(\d+)\s*(?:ads?|businesses?|companies?)/i)
    if (countMatch) {
      data.adCount = Number.parseInt(countMatch[1])
    }

    if (/youtube/i.test(text)) {
      data.includeYouTube = true
    }

    return data
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const extracted = extractInformation(input.trim())
    setExtractedData(extracted)
    setShowConfirmation(true)
  }

  const handleConfirm = (finalData: ExtractedData) => {
    setShowConfirmation(false)
    onComplete(finalData)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const suggestedPrompts = [
    "I need to scrape fitness businesses from France",
    "Show me 100 e-commerce ads from the United States",
    "Analyze SaaS companies in the UK with YouTube ads",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationBar />

      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              Spy on any competitor's ads
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Get instant access to winning ad strategies. Just name the competitor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Ask anything"
                className="w-full min-h-[120px] px-6 py-5 pr-32 text-lg rounded-3xl border-2 border-border bg-card shadow-lg focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none outline-none placeholder:text-muted-foreground/60"
                style={{ lineHeight: "1.5" }}
              />
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="rounded-full w-10 h-10 hover:bg-accent"
                  onClick={() => textareaRef.current?.focus()}
                >
                  <Mic className="w-5 h-5 text-muted-foreground" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim()}
                  className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 shadow-md"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {isFocused && input.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl border border-border bg-card shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="text-xs text-muted-foreground mb-3 px-2 font-medium">Try these examples</p>
                <div className="space-y-1.5">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setInput(prompt)
                        textareaRef.current?.focus()
                      }}
                      className="w-full px-4 py-3 rounded-xl hover:bg-accent transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                          <Sparkles className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                          {prompt}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {extractedData && (
        <ConfirmationDialog
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          extractedData={extractedData}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
