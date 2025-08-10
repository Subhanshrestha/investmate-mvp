import Header from './components/Header.jsx'
import QuizContainer from './components/QuizContainer.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <QuizContainer />
      </main>
      <footer className="text-xs text-center text-gray-500 py-6">
        © {new Date().getFullYear()} InvestMate • Educational only — not financial advice.
      </footer>
    </div>
  )
}
