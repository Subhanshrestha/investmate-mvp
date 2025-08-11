export default function SavedPlans({ plans, onDelete }) {
  if (!plans?.length) return (
    <div className="bg-white rounded-2xl shadow p-6 text-sm text-gray-600">
      No saved plans yet.
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-sm font-medium mb-3">Saved Plans</h3>
      <ul className="space-y-2">
        {plans.map(p => (
          <li key={p._id} className="flex items-center justify-between bg-gray-50 rounded p-3 text-sm">
            <span>
              <b>{p.allocation.etf}% / {p.allocation.stocks}% / {p.allocation.bonds}%</b>
              <span className="text-gray-500"> • {new Date(p.createdAt).toLocaleString()}</span>
            </span>
            <button
              onClick={() => onDelete(p._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
