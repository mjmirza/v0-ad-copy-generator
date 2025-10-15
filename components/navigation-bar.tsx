import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { Sparkles, FileText, Settings, HelpCircle } from "lucide-react"

export function NavigationBar() {
  return (
    <div className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-3">
        <Menubar className="border-none bg-transparent">
          <div className="flex items-center gap-2 mr-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">AdIntel</span>
          </div>

          <MenubarMenu>
            <MenubarTrigger className="text-sm font-medium">Product</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Features</MenubarItem>
              <MenubarItem>Pricing</MenubarItem>
              <MenubarItem>Use Cases</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="text-sm font-medium">Resources</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </MenubarItem>
              <MenubarItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help Center
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="text-sm font-medium">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Account</MenubarItem>
              <MenubarItem>Preferences</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  )
}
