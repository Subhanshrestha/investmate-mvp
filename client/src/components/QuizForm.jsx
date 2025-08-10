export default function QuizForm({ form, errors, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={onChange}
          min={18}
          max={99}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="e.g., 22"
          required
        />
        {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Budget / month (USD)</label>
        <input
          type="number"
          name="budget"
          value={form.budget}
          onChange={onChange}
          min={10}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="e.g., 50"
          required
        />
        {errors.budget && <p className="text-red-600 text-sm mt-1">{errors.budget}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Goal timeline (years)</label>
        <input
          type="number"
          name="goalYears"
          value={form.goalYears}
          onChange={onChange}
          min={1}
          max={50}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="e.g., 5"
          required
        />
        {errors.goalYears && <p className="text-red-600 text-sm mt-1">{errors.goalYears}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Risk appetite</label>
        <select
          name="risk"
          value={form.risk}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2 bg-white"
          required
        >
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        {errors.risk && <p className="text-red-600 text-sm mt-1">{errors.risk}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Calculating...' : 'Get My Plan'}
      </button>
    </form>
  )
}
