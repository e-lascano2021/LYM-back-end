import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  armies: [{type: mongoose.Schema.Types.ObjectId, ref: "Army"}],
  loveTypes: [{
    type: String,
    enum: ["Eros", "Philia", "Storge", "Agape", "Ludus", "Pragma", "Philautia", "Mania"],
    required: true
  }],
  loveLanguages: [{
    type: String,
    enum: ["Words of Affirmation", "Acts of Service", "Receiving Gifts", "Quality Time", "Physical Touch"],
    required: true
  }],
  plans:[{type: mongoose.Schema.Types.ObjectId, ref: "Plan"}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
