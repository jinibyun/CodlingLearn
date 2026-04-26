"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) {
        setUser(session?.user || null);
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };
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
                {!loading && (
                  <div className="flex items-center gap-4">
                    {user && (
                      <Link href="/profile" className="text-sm font-semibold hover:text-slate-300">
                        프로필
                      </Link>
                    )}
                    {!user ? (
                      <Link href="/login" className="text-sm font-semibold hover:text-slate-300">
                        로그인
                      </Link>
                    ) : (
                      <button
                        onClick={handleLogout}
                        className="text-sm font-semibold hover:text-slate-300"
                      >
                        로그아웃
                      </button>
                    )}
                  </div>
                )}
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
