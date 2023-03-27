import { Army } from "../models/army.js"
import { Profile } from "../models/profile.js"
import { Plan } from "../models/plan.js"


function create (req, res) {
  Profile.findById(req.user.profile)
  .then(myProfile => {
    Army.findById(req.params.armyId)
    .then(army => {
      req.body.who = army._id
      Plan.create(req.body)
      .then(newPlan => {
        Plan.findById(newPlan._id)
        .populate("who")
        .then(plan => {
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
  })
}

function deletePlan (req, res) {
  Profile.findById(req.user.profile)
  .then(myProfile => {
    Army.findById(req.params.armyId)
    .then(army => {
      Plan.findByIdAndDelete(req.params.id)
      .then(plan => {
        myProfile.plans.remove({_id: req.params.id})
        army.plans.remove({_id: req.params.id})
        army.save()
        myProfile.save()
        return res.status(201).json(army)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({err: err.errmsg})
      })
    })
  })
}

function update (req, res) {
  Plan.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .populate("who")
  .then(plan => {
    return res.status(201).json(plan)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}


export {
  create,
  deletePlan as delete,
  update
}
