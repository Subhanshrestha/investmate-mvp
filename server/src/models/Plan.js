import mongoose from 'mongoose'

const AllocationSchema = new mongoose.Schema({
  etf: { type: Number, required: true },
  stocks: { type: Number, required: true },
  bonds: { type: Number, required: true },
}, { _id: false })

const PlanSchema = new mongoose.Schema({
  anonId: { type: String, required: true, index: true },
  allocation: { type: AllocationSchema, required: true },
  riskLevel: { type: String, enum: ['low', 'moderate', 'high'], required: true },
}, { timestamps: { createdAt: true, updatedAt: false } })

export default mongoose.model('Plan', PlanSchema)
