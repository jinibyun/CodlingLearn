import { useEffect, useState } from 'react'

const TODO_STORAGE_KEY = 'todo-list-items'

function TodoList() {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(TODO_STORAGE_KEY)
    if (!savedTodos) {
      return []
    }

    try {
      const parsed = JSON.parse(savedTodos)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      localStorage.removeItem(TODO_STORAGE_KEY)
      return []
    }
  })

  
  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    const nextTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    }

    setTodos((x) => [nextTodo, ...x])
    setValue('')
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id) => {
    setTodos((x) => x.filter((todo) => todo.id !== id))
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Todo List</h1>
          <p className="mt-2 text-sm text-slate-500">오늘 할 일을 정리하고 바로 체크해보세요.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo()
              }
            }}
            type="text"
            placeholder="할 일을 입력하세요"
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
          <button
            type="button"
            onClick={addTodo}
            className="h-12 rounded-2xl bg-blue-500 px-6 font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-600 active:scale-[0.98]"
          >
            추가
          </button>
        </div>
      </section>

      <section className="mt-6 space-y-3">
        {todos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-400 shadow-sm">
            아직 등록된 할 일이 없습니다.
          </div>
        ) : (
          todos.map((todo) => (
            <article
              key={todo.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/60"
            >
              <label className="flex min-w-0 items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-500"
                />
                <span
                  className={
                    todo.completed
                      ? 'truncate text-slate-400 line-through'
                      : 'truncate text-slate-700'
                  }
                >
                  {todo.text}
                </span>
              </label>

              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                aria-label="할 일 삭제"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M8 6V4h8v2" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default TodoList
