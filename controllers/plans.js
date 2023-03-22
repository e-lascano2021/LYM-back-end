import { Army } from "../models/army.js"
import { Profile } from "../models/profile.js"
import { Plan } from "../models/plan.js"




function create (req, res) {
  Profile.findById(req.user.profile)
  .then(myProfile => {
    console.log("myProfile", myProfile)
    Army.findById(req.params.armyId)
    .then(army => {
      console.log("army", army)
      req.body.who = army._id
      console.log(req.body)
      Plan.create(req.body)
      .then(plan => {
        console.log("plan", plan)
        myProfile.plans.push(plan)
        army.plans.push(plan)
        army.save()
        myProfile.save()
        return res.status(201).json(plan)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({err: err.errmsg})
      })
    })
  })
}


export {
  create
}
