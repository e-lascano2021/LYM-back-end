import mongoose from 'mongoose'

const Schema = mongoose.Schema

const planSchema = new Schema({
  when: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  where:{
    type: String,
    required: true
  },
  what: {
    type: String,

  },
  who: {
    type: mongoose.Schema.Types.ObjectId, ref: "Army"
  }
  
},{
  timestamps: true,
})

const Plan = mongoose.model('Plan', planSchema)

export { Plan }