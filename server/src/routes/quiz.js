import { Router } from 'express'

const router = Router()

function clampAllocation(a) {
  const total = a.etf + a.stocks + a.bonds
  if (total === 100) return a
  const factor = 100 / total
  return {
    etf: Math.round(a.etf * factor),
    stocks: Math.round(a.stocks * factor),
    bonds: Math.round(a.bonds * factor),
  }
}

router.post('/plan', (req, res) => {
  const { age, budget, goalYears, risk } = req.body || {}

  // Basic validation
  if (!(Number.isFinite(age) && age >= 18 && age <= 99)) {
    return res.status(400).json({ message: 'Invalid age' })
  }
  if (!(Number.isFinite(budget) && budget >= 10)) {
    return res.status(400).json({ message: 'Invalid budget' })
  }
  if (!(Number.isFinite(goalYears) && goalYears >= 1 && goalYears <= 50)) {
    return res.status(400).json({ message: 'Invalid goal years' })
  }
  if (!['low', 'moderate', 'high'].includes(risk)) {
    return res.status(400).json({ message: 'Invalid risk' })
  }

  // Base allocation by risk
  let allocation = { etf: 60, stocks: 25, bonds: 15 }
  if (risk === 'low') allocation = { etf: 70, stocks: 10, bonds: 20 }
  if (risk === 'high') allocation = { etf: 40, stocks: 50, bonds: 10 }

  // Adjust by short time horizon: if < 3 years, tilt safer by +10 bonds, -10 stocks
  if (goalYears < 3) {
    allocation = { etf: allocation.etf, stocks: Math.max(0, allocation.stocks - 10), bonds: allocation.bonds + 10 }
  }

  // Adjust by budget (purely illustrative; keeps totals ~100)
  if (budget < 25) allocation = { etf: allocation.etf + 5, stocks: Math.max(0, allocation.stocks - 5), bonds: allocation.bonds }
  if (budget >= 200) allocation = { etf: Math.max(0, allocation.etf - 5), stocks: allocation.stocks + 5, bonds: allocation.bonds }

  allocation = clampAllocation(allocation)

  const tips = [
    'Automate contributions each month.',
    'Prefer broad-market ETFs for diversification.',
    goalYears < 3 ? 'Short horizon → keep more in bonds/cash.' : 'Longer horizon → you can take a bit more equity risk.'
  ]

  return res.json({ allocation, riskLevel: risk, tips })
})

export default router
