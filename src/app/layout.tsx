import type { Metadata } from "next"
import { Livvic } from "next/font/google"

import "@/styles/global.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Toaster } from "@/components/_ui/sonner"
import { CartProvider } from "@/context/cart-context"

export const metadata: Metadata = {
  title: "eStore",
  description: "A sua loja online"
}

const livvic = Livvic({
  subsets: ["latin"],
  weight: "400"
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${livvic.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>{children}</CartProvider>
          <Toaster duration={3000} position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
