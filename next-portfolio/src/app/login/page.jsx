import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력해 주세요.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              autoComplete="email"
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
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">로그인</Button>
          <p className="text-center text-xs text-muted-foreground">
            계정이 없으신가요?{" "}
            <a href="#" className="text-primary hover:underline">
              회원가입
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
