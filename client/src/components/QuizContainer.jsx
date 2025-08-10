import { useEffect, useState } from 'react'
import QuizForm from './QuizForm.jsx'
import ResultCard from './ResultCard.jsx'
import ChartSection from './ChartSection.jsx'
import SavedPlans from './SavedPlans.jsx'
import { postPlanFromQuiz, savePlan, getPlans, deletePlan } from '../api'
import useAnonId from '../hooks/useAnonId.js'

const initialForm = { age: 22, budget: 50, goalYears: 5, risk: 'moderate' }

export default function QuizContainer() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [saving, setSaving] = useState(false)
  const [plans, setPlans] = useState([])
  const [showTrending, setShowTrending] = useState(false)
  const anonId = useAnonId()

  useEffect(() => {
    if (anonId) {
      getPlans(anonId).then((res) => setPlans(res)).catch(() => {})
    }
  }, [anonId])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validate = () => {
    const e = {}
    const age = Number(form.age)
    const budget = Number(form.budget)
    const goalYears = Number(form.goalYears)
    if (!(age >= 18 && age <= 99)) e.age = 'Age must be between 18 and 99.'
    if (!(budget >= 10)) e.budget = 'Budget must be at least $10/month.'
    if (!(goalYears >= 1 && goalYears <= 50)) e.goalYears = 'Goal must be 1–50 years.'
    if (!['low', 'moderate', 'high'].includes(form.risk)) e.risk = 'Invalid risk.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await postPlanFromQuiz({
        age: Number(form.age),
        budget: Number(form.budget),
        goalYears: Number(form.goalYears),
        risk: form.risk
      })
      setPlan(res)
    } catch (err) {
      alert('Failed to calculate plan. Check server is running.')
    } finally {
      setLoading(false)
    }
  }

  const onSave = async () => {
    if (!plan) return
    setSaving(true)
    try {
      const saved = await savePlan(anonId, plan)
      setPlans((p) => [saved, ...p])
      alert('Plan saved.')
    } catch (err) {
      alert('Failed to save plan.')
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id) => {
    try {
      await deletePlan(id)
      setPlans((p) => p.filter(x => x._id !== id))
    } catch (err) {
      alert('Failed to delete.')
    }
  }

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setPlan(null)
    setShowTrending(false)
  }

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <QuizForm form={form} errors={errors} onChange={onChange} onSubmit={onSubmit} loading={loading} />
        <div className="space-y-4">
          <ResultCard plan={plan} onSave={onSave} saving={saving} />
          <div className="flex gap-2">
            <button onClick={() => setShowTrending(s => !s)} className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm">
              {showTrending ? 'Hide Trending' : 'Show Trending'}
            </button>
            <button onClick={reset} className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm">Retake Quiz</button>
          </div>
        </div>
      </div>

      <ChartSection plan={plan} showTrending={showTrending} toggleTrending={() => setShowTrending(s => !s)} />

      <SavedPlans plans={plans} onDelete={onDelete} />
    </div>
  )
}
