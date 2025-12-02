import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Projeto Aula</h1>
          <div className="flex gap-4">
            <Link to="/" className="text-blue-600 hover:underline">Início</Link>
            <Link to="/sobre" className="text-blue-600 hover:underline">Sobre</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
