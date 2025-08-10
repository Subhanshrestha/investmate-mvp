export default function ResultCard({ plan, onSave, saving }) {
  if (!plan) return null
  const { allocation, riskLevel, tips } = plan

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Plan</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{riskLevel}</span>
      </div>
      <p className="text-sm text-gray-600">Suggested allocation that sums to 100%.</p>

      <ul className="text-sm grid grid-cols-3 gap-2">
        <li className="bg-gray-50 rounded p-3 text-center">ETFs: <b>{allocation.etf}%</b></li>
        <li className="bg-gray-50 rounded p-3 text-center">Stocks: <b>{allocation.stocks}%</b></li>
        <li className="bg-gray-50 rounded p-3 text-center">Bonds: <b>{allocation.bonds}%</b></li>
      </ul>

      {tips?.length ? (
        <div className="mt-2">
          <h3 className="text-sm font-medium mb-1">Tips</h3>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      ) : null}

      <button
        onClick={onSave}
        disabled={saving}
        className="w-full bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 disabled:opacity-60 mt-2"
      >
        {saving ? 'Saving...' : 'Save Plan'}
      </button>
    </div>
  )
}
