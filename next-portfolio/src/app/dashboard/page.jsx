"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// --- 사이드바 메뉴 항목 ---
const navItems = [
  { label: "대시보드", icon: "⊞", href: "#" },
  { label: "사용자 관리", icon: "👥", href: "#" },
  { label: "콘텐츠 관리", icon: "📄", href: "#" },
  { label: "통계", icon: "📊", href: "#" },
  { label: "설정", icon: "⚙️", href: "#" },
];

// --- 최근 활동 카드 데이터 ---
const activityCards = [
  {
    title: "신규 가입자",
    value: "1,284",
    change: "+12%",
    positive: true,
    description: "이번 달 신규 회원 수",
    icon: "👤",
  },
  {
    title: "총 주문",
    value: "3,572",
    change: "+8%",
    positive: true,
    description: "이번 달 총 주문 건수",
    icon: "🛒",
  },
  {
    title: "수익",
    value: "₩4,820,000",
    change: "-3%",
    positive: false,
    description: "이번 달 총 수익",
    icon: "💰",
  },
];

// --- SVG 막대 그래프 데이터 ---
const barData = [
  { label: "1월", value: 40 },
  { label: "2월", value: 65 },
  { label: "3월", value: 50 },
  { label: "4월", value: 80 },
  { label: "5월", value: 72 },
  { label: "6월", value: 90 },
  { label: "7월", value: 60 },
];

// --- 꺾은선 그래프 데이터 ---
const lineData = [30, 55, 45, 70, 60, 85, 75, 95, 80, 100, 90, 110];
const months = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

function BarChart() {
  const max = Math.max(...barData.map((d) => d.value));
  return (
    <div className="flex items-end gap-3 h-36 w-full">
      {barData.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md bg-primary/70 transition-all"
            style={{ height: `${(d.value / max) * 100}%` }}
          />
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart() {
  const max = Math.max(...lineData);
  const min = Math.min(...lineData);
  const w = 600;
  const h = 120;
  const padX = 10;
  const padY = 10;

  const points = lineData.map((v, i) => {
    const x = padX + (i / (lineData.length - 1)) * (w - padX * 2);
    const y = padY + ((max - v) / (max - min)) * (h - padY * 2);
    return `${x},${y}`;
  });
  const polyline = points.join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h + 20}`} className="w-full" preserveAspectRatio="none">
        {/* 그리드 라인 */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padY + t * (h - padY * 2);
          return (
            <line
              key={t}
              x1={padX} y1={y} x2={w - padX} y2={y}
              stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"
            />
          );
        })}
        {/* 라인 */}
        <polyline
          points={polyline}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.7"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* 점 */}
        {points.map((pt, i) => {
          const [x, y] = pt.split(",").map(Number);
          return <circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" fillOpacity="0.8" />;
        })}
        {/* 월 레이블 */}
        {lineData.map((_, i) => {
          const x = padX + (i / (lineData.length - 1)) * (w - padX * 2);
          return (
            <text key={i} x={x} y={h + 16} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5">
              {months[i]}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] bg-background text-foreground">

      {/* ── 사이드바 ── */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-card px-3 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          메뉴
        </p>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground first:bg-muted first:text-foreground"
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </aside>

      {/* ── 메인 영역 ── */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* 상단 헤더 */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-3 w-64">
            <Input placeholder="검색..." className="h-8 text-sm" />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">알림 🔔</Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="관리자" />
                  <AvatarFallback>관</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>프로필</DropdownMenuItem>
                <DropdownMenuItem>설정</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          <h1 className="text-2xl font-bold">안녕하세요, 관리자님 👋</h1>

          {/* 최근 활동 카드 3개 */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              최근 활동
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activityCards.map((card) => (
                <Card key={card.title}>
                  <CardHeader className="pb-1">
                    <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                      <span>{card.title}</span>
                      <span className="text-xl">{card.icon}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{card.value}</p>
                    <p className={`mt-1 text-xs font-medium ${card.positive ? "text-green-500" : "text-red-500"}`}>
                      {card.change} 지난달 대비
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* 그래프 섹션 */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* 막대 그래프 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">월별 주문 수 (막대)</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart />
              </CardContent>
            </Card>

            {/* 꺾은선 그래프 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">월별 수익 추이 (꺾은선)</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart />
              </CardContent>
            </Card>

          </section>

          {/* 최근 주문 테이블 */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold">최근 주문</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="pb-2 text-left font-medium">주문 번호</th>
                        <th className="pb-2 text-left font-medium">고객</th>
                        <th className="pb-2 text-left font-medium">금액</th>
                        <th className="pb-2 text-left font-medium">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { id: "#1042", name: "김민준", amount: "₩82,000", status: "완료", ok: true },
                        { id: "#1041", name: "이서연", amount: "₩34,500", status: "처리중", ok: null },
                        { id: "#1040", name: "박도윤", amount: "₩120,000", status: "완료", ok: true },
                        { id: "#1039", name: "최지우", amount: "₩15,000", status: "취소", ok: false },
                      ].map((row) => (
                        <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                          <td className="py-2 font-mono text-xs">{row.id}</td>
                          <td className="py-2">{row.name}</td>
                          <td className="py-2">{row.amount}</td>
                          <td className="py-2">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              row.ok === true  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" :
                              row.ok === false ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" :
                                                 "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

        </main>
      </div>
    </div>
  );
}
