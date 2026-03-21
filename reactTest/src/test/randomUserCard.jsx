import { useEffect, useState } from 'react'

function getRandomUserId() {
  return Math.floor(Math.random() * 10) + 1
}

function RandomUserCard() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchRandomUserPost = async () => {
    
    const randomUserId = getRandomUserId()
    setIsLoading(true)

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${randomUserId}/posts`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user posts')
      }

      const posts = await response.json()
      const randomPost = posts[Math.floor(Math.random() * posts.length)]

      setUserData({
        id: randomUserId,
        title: randomPost?.title ?? '제목 없음',
        body: randomPost?.body ?? '내용 없음',
      })
    } catch {
      setUserData({
        id: randomUserId,
        title: '데이터를 가져오지 못했어요.',
        body: '잠시 후 다시 시도해 주세요.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomUserPost()
  },[])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p className="text-center text-lg font-semibold text-slate-600">
          유저 정보를 불러오는 중...
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-10 sm:px-6">
      <section className="w-full rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-sm sm:p-8">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Random User Card
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
            랜덤 유저 포스트
          </h1>
        </div>

        <article className="space-y-4 rounded-2xl bg-slate-50 p-5 shadow-inner shadow-slate-200/70">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">번호 (id)</p>
            <p className="mt-1 text-lg font-bold text-slate-800">{userData?.id}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">제목 (title)</p>
            <p className="mt-1 text-base font-semibold text-slate-800">{userData?.title}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">내용 (body)</p>
            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-600">{userData?.body}</p>
          </div>
        </article>

        <button
          type="button"
          onClick={fetchRandomUserPost}
          className="mt-6 w-full rounded-2xl bg-blue-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600 active:scale-[0.99]"
        >
          다른 유저 불러오기
        </button>
      </section>
    </main>
  )
}

export default RandomUserCard
