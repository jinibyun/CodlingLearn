import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OOO의 포트폴리오",
  description: "Next.js로 만든 첫 번째 작품",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="bg-black text-white">
            <nav className="mx-auto flex w-full max-w-5xl items-center gap-6 px-6 py-4">
              <Link href="/" className="text-sm font-semibold hover:text-slate-300">
                Home
              </Link>
              <Link href="/about" className="text-sm font-semibold hover:text-slate-300">
                About
              </Link>
              <Link href="/menu" className="text-sm font-semibold hover:text-slate-300">
                Menu
              </Link>
              <Link href="/dashboard" className="text-sm font-semibold hover:text-slate-300">
                Dashboard
              </Link>
              <Link href="/profile" className="text-sm font-semibold hover:text-slate-300">
                Profile
              </Link>
              <div className="ml-auto flex items-center gap-4">
                <ThemeToggle />
                <Link href="/login" className="text-sm font-semibold hover:text-slate-300">
                  로그인
                </Link>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
