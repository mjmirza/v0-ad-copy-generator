"use client"

import { useState } from "react"
import { SmartInput } from "@/components/smart-input"
import { Dashboard } from "@/components/dashboard"

type AppState = "onboarding" | "dashboard"

interface ConversationData {
  location?: string
  adCount?: number
  includeYouTube?: boolean
  niche?: string
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("onboarding")
  const [conversationData, setConversationData] = useState<ConversationData>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleOnboardingComplete = (data: ConversationData) => {
    setConversationData(data)
    setAppState("dashboard")
  }

  const handleNewSearch = () => {
    setAppState("onboarding")
    setConversationData({})
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  return (
    <>
      {appState === "onboarding" && <SmartInput onComplete={handleOnboardingComplete} />}
      {appState === "dashboard" && (
        <Dashboard
          conversationData={conversationData}
          onNewSearch={handleNewSearch}
          isAuthenticated={isAuthenticated}
          onAuthenticated={handleAuthenticated}
        />
      )}
    </>
  )
}
