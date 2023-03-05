import { Army } from "../models/army.js"
import { Profile } from "../models/profile.js"
import { Plan } from "../models/plan.js"




function create (req, res) {
  Profile.findById(req.user.profile)
  .then(myProfile => {
    Army.findById(req.params.id)
    .then(army => {
      req.body.who = army
      Plan.create(req.body)
      .then(plan => {
        army.plans.push(plan)
        myProfile.plans.push(plan)
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
