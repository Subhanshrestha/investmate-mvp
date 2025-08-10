import { Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function ChartSection({ plan, showTrending, toggleTrending }) {
  if (!plan) return null
  const { allocation } = plan

  const pieData = {
    labels: ['ETFs', 'Stocks', 'Bonds'],
    datasets: [
      {
        label: 'Allocation %',
        data: [allocation.etf, allocation.stocks, allocation.bonds],
        backgroundColor: ['#60a5fa','#34d399','#fbbf24']
      }
    ]
  }

  const barData = {
    labels: ['AAPL', 'MSFT', 'NVDA', 'VTI', 'VOO'],
    datasets: [
      {
        label: 'Mock Trending Score',
        data: [92, 88, 85, 80, 76],
        backgroundColor: 'rgba(59,130,246,0.5)'
      }
    ]
  }

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
  scales: {
    y: { beginAtZero: true, suggestedMax: 100, grid: { display: false } },
    x: { grid: { display: false } }
  }
};

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl shadow p-6 h-80">
        <h3 className="text-sm font-medium mb-3">Allocation</h3>
        <div className="h-64">
          <Pie data={pieData} options={options} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-80">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Trending (Mock)</h3>
          <button
            onClick={toggleTrending}
            className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
          >
            {showTrending ? 'Hide' : 'Show'}
          </button>
        </div>
        {showTrending ? (
          <div className="h-64">
            <Bar data={barData} options={options} />
          </div>
        ) : (
          <p className="text-sm text-gray-500">Click “Show” to view mock trending data.</p>
        )}
      </div>
    </div>
  )
}
