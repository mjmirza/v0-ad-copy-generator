import type React from "react"
import type { Metadata } from "next"
import { Poppins, Libre_Baskerville, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "AdIntel AI - Google Ads Intelligence Platform",
  description: "Scrape, analyze, and generate Google ads with AI-powered intelligence",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
