"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage("가입 성공! 이메일을 확인해주세요.");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("예상치 못한 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        setMessage("로그인 성공!");
        await supabase.auth.getSession();
        router.refresh();
        window.location.assign("/profile");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("예상치 못한 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력해 주세요.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          {message && (
            <div className="text-green-500 text-sm font-medium">{message}</div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
              <a href="#" className="text-xs text-muted-foreground hover:underline">
                비밀번호 찾기
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={handleSignIn}
            disabled={loading || !email || !password}
          >
            {loading ? "처리 중..." : "로그인"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            계정이 없으신가요?{" "}
            <button
              onClick={handleSignUp}
              disabled={loading || !email || !password}
              className="text-primary hover:underline disabled:text-muted-foreground"
            >
              회원가입
            </button>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
