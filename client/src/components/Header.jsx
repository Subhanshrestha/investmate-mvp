export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">InvestMate</h1>
        <a
          className="text-sm text-blue-600 hover:underline"
          href="https://example.com"
          target="_blank"
          rel="noreferrer"
        >
          Docs
        </a>
      </div>
    </header>
  )
}
