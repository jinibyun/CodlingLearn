"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

async function fetchUserData() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          username: "jini_developer",
          email: "jini@example.com",
          bio: "Toronto based developer",
          role: "developer",
          marketing_emails: true,
          theme: "dark",
        }),
      1500
    )
  );
}

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "닉네임은 2~20자 사이여야 합니다." })
    .max(20, { message: "닉네임은 2~20자 사이여야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
  bio: z
    .string()
    .max(160, { message: "자기소개는 160자를 초과할 수 없습니다." })
    .optional(),
  role: z.string().min(1, { message: "직업을 선택해주세요." }),
  marketing_emails: z.boolean().default(false),
  theme: z.enum(["light", "dark", "system"]).default("system"),
});

export default function ProfilePage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      role: "",
      marketing_emails: false,
      theme: "system",
    },
  });

  const bioValue = form.watch("bio") ?? "";
  const { isSubmitting } = form.formState;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData().then((data) => {
      form.reset(data);
      setIsLoading(false);
    });
  }, [form]);

  async function onSubmit(values) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (Math.random() < 0.5) throw new Error("서버 응답 지연");
      console.log(values);
      toast.success("프로필 저장 성공!", {
        description: `이메일: ${values.email} · 직업: ${values.role}`,
      });
    } catch (error) {
      toast.error("저장 실패", {
        description: "서버에 문제가 발생했습니다. 다시 시도해주세요.",
      });
    }
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">사용자 정보를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">종합 프로필 설정</CardTitle>
            <CardDescription>계정 정보와 환경 설정을 업데이트하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* ── 기본 정보 섹션 ── */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border pb-2">
                    기본 정보
                  </h3>

                  {/* username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>닉네임</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormDescription>2~20자 사이의 닉네임을 입력하세요.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>최소 8자 이상 입력하세요.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          자기소개{" "}
                          <span className="text-muted-foreground font-normal">(선택)</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="간단한 자기소개를 작성해 주세요."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between">
                          <FormMessage />
                          <span className="ml-auto text-xs text-muted-foreground">
                            {bioValue.length} / 160
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* role */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>직업</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="직업을 선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="developer">개발자</SelectItem>
                            <SelectItem value="designer">디자이너</SelectItem>
                            <SelectItem value="manager">매니저</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── 환경 설정 섹션 ── */}
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground border-b border-border pb-2">
                    환경 설정
                  </h3>

                  {/* theme */}
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>테마</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6 pt-1"
                          >
                            {[
                              { value: "light", label: "밝게 ☀️" },
                              { value: "dark", label: "어둡게 🌙" },
                              { value: "system", label: "시스템 설정 💻" },
                            ].map((item) => (
                              <FormItem key={item.value} className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* marketing_emails */}
                  <FormField
                    control={form.control}
                    name="marketing_emails"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">광고 및 마케팅 이메일 수신</FormLabel>
                          <FormDescription>
                            새로운 기능, 이벤트 등의 소식을 이메일로 받습니다.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      저장 중...
                    </>
                  ) : (
                    "프로필 저장"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
