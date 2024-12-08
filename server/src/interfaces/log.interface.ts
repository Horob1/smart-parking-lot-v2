import mongoose from 'mongoose'

export interface ILog {
  paid: boolean
  bill: number
  userId?: mongoose.Types.ObjectId
  cardId: mongoose.Types.ObjectId
}
