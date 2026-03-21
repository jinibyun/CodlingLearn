const menuItems = [
	{ name: '마르게리타 피자', price: '18,000원' },
	{ name: '까르보나라 파스타', price: '16,000원' },
	{ name: '시저 샐러드', price: '11,000원' },
	{ name: '트러플 감자튀김', price: '9,000원' },
	{ name: '레몬 에이드', price: '6,000원' },
]

export default function MenuPage() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-14">
			<h1 className="text-3xl font-bold text-slate-900">레스토랑 기본 메뉴</h1>
			<p className="mt-2 text-slate-500">그림 없이 메뉴와 가격만 간단히 확인할 수 있습니다.</p>

			<section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<ul className="divide-y divide-slate-200">
					{menuItems.map((item) => (
						<li key={item.name} className="flex items-center justify-between py-4">
							<span className="font-medium text-slate-800">{item.name}</span>
							<span className="font-semibold text-slate-600">{item.price}</span>
						</li>
					))}
				</ul>
			</section>
		</main>
	)
}
