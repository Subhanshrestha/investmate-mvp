import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const http = axios.create({ baseURL })

export async function postPlanFromQuiz(body) {
  const { data } = await http.post('/api/quiz/plan', body)
  return data
}

export async function savePlan(anonId, plan) {
  const { data } = await http.post('/api/plans', {
    anonId,
    allocation: plan.allocation,
    riskLevel: plan.riskLevel
  })
  return data
}

export async function getPlans(anonId) {
  const { data } = await http.get('/api/plans', { params: { anonId } })
  return data
}

export async function deletePlan(id) {
  const { data } = await http.delete(`/api/plans/${id}`)
  return data
}
