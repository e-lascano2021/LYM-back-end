import mongoose from 'mongoose'

const Schema = mongoose.Schema

const giftSchema = new Schema ({
  item: {
    type: String,
    required: true
  },
  where: {
    type: String,
    required: true,
  },
  notes: {
    type: String
  }
})

const reminderSchema = new Schema ({
  text: {
    type: String,
  },
  author: {
    type: String,
  },
  link: {
    type: String
  },
  notes: {
    type: String
  }
})

const armySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  loveTypes: [{
    type: String,
    enum: ["Eros", "Philia", "Storge", "Agape", "Ludus", "Pragma", "Philautia", "Mania"],
    required: true,
  }],
  loveLanguages: [{
    type: String,
    enum: ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"],
    required: true
  }],
  image: {
    type: String,
  },
  totalPoints: {
    type: Number,
    default: 250,
  },
  currentPoints: {
    type: Number,
    default: 125,
  },
  gifts: [
    giftSchema
  ],
  reminders: [
    reminderSchema
  ],
  plans: [{type: mongoose.Schema.Types.ObjectId, ref: "Plan"}],
  status: {
    type: Boolean,
    default: true,
  }
},{
  timestamps: true,
})

const Army = mongoose.model('Army', armySchema)

export { Army }
