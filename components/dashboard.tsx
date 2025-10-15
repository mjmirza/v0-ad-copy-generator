"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, FileText, MessageSquare, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { DashboardOverview } from "@/components/dashboard-overview"
import { AuthGate } from "@/components/auth-gate"

interface DashboardProps {
  conversationData: {
    location?: string
    adCount?: number
    includeYouTube?: boolean
    niche?: string
  }
  onNewSearch: () => void
  isAuthenticated: boolean
  onAuthenticated: () => void
}

type ActivePanel = "dashboard" | "competitors" | "reports" | "ai-chat"

export function Dashboard({ conversationData, onNewSearch, isAuthenticated, onAuthenticated }: DashboardProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>("dashboard")

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background relative">
        <Sidebar>
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">DA</span>
              </div>
              <div>
                <h2 className="font-semibold text-sm">DominAD</h2>
                <p className="text-xs text-muted-foreground">Competitor Intelligence</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <p className="text-xs font-medium text-muted-foreground px-3 py-2">Navigation</p>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePanel === "dashboard"}
                  onClick={() => setActivePanel("dashboard")}
                  className="gap-3"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePanel === "competitors"}
                  onClick={() => setActivePanel("competitors")}
                  className="gap-3"
                >
                  <Users className="w-4 h-4" />
                  <span>Competitors</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePanel === "reports"}
                  onClick={() => setActivePanel("reports")}
                  className="gap-3"
                >
                  <FileText className="w-4 h-4" />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePanel === "ai-chat"}
                  onClick={() => setActivePanel("ai-chat")}
                  className="gap-3"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>AI Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="gap-3">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-sm font-semibold">DominAD Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {activePanel === "dashboard" && (
              <DashboardOverview conversationData={conversationData} onNewSearch={onNewSearch} />
            )}
            {activePanel === "competitors" && (
              <div className="p-6">
                <h2 className="text-2xl font-bold">Competitors</h2>
                <p className="text-muted-foreground mt-2">Manage and track your competitors</p>
              </div>
            )}
            {activePanel === "reports" && (
              <div className="p-6">
                <h2 className="text-2xl font-bold">Reports</h2>
                <p className="text-muted-foreground mt-2">View generated reports and insights</p>
              </div>
            )}
            {activePanel === "ai-chat" && (
              <div className="p-6">
                <h2 className="text-2xl font-bold">AI Chat</h2>
                <p className="text-muted-foreground mt-2">Chat with AI about your ad strategies</p>
              </div>
            )}
          </main>
        </SidebarInset>

        {!isAuthenticated && <AuthGate onAuthenticated={onAuthenticated} />}
      </div>
    </SidebarProvider>
  )
}
