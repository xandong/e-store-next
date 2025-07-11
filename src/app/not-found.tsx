import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Página não encontrada</p>
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
