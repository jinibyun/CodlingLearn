import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/80">
        <Image
          src="/testNagoya.jpg"
          alt="Nagoya"
          width={300}
          height={300}
          priority
        />
      </div>
    </main>
  );
}
