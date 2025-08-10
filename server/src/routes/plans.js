import { Router } from 'express'
import Plan from '../models/Plan.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { anonId } = req.query
    if (!anonId) return res.status(400).json({ message: 'anonId required' })
    const plans = await Plan.find({ anonId }).sort({ createdAt: -1 }).lean()
    res.json(plans)
  } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
  try {
    const { anonId, allocation, riskLevel } = req.body || {}
    if (!anonId) return res.status(400).json({ message: 'anonId required' })
    if (!allocation || typeof allocation.etf !== 'number' || typeof allocation.stocks !== 'number' || typeof allocation.bonds !== 'number') {
      return res.status(400).json({ message: 'allocation invalid' })
    }
    if (!['low', 'moderate', 'high'].includes(riskLevel)) {
      return res.status(400).json({ message: 'riskLevel invalid' })
    }
    const created = await Plan.create({ anonId, allocation, riskLevel })
    res.status(201).json(created)
  } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Plan.findByIdAndDelete(id)
    res.json({ ok: true })
  } catch (err) { next(err) }
})

export default router
