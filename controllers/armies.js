import {Army} from "../models/army.js"
import {Profile} from "../models/profile.js"


function index(req, res) {
  Profile.findById(req.user.profile)
  .populate("armies")
  .then(myProfile => {
    res.json(myProfile.armies)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}


function create (req, res) {
  req.body.loveTypes = req.body.loveTypes?.map(el => {return el.value})
  req.body.loveLanguages = req.body.loveLanguages?.map(el => {return el.value})
  Profile.findById(req.user.profile)
  .then(myProfile => {
    Army.create(req.body)
    .then(army => {
      myProfile.armies.push(army)
      myProfile.save()
      res.json(army)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update (req, res) {
  req.body.loveTypes = req.body.loveTypes?.map(el => {return el.value})
  req.body.loveLanguages = req.body.loveLanguages?.map(el => {return el.value})
  Army.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedArmy => {
    res.json(updatedArmy)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function updatePoints (req, res) {
  Army.findById(req.params.id)
  .then(army => {
    if(army.currentPoints + req.body.currentPoints > army.totalPoints) {
      army.totalPoints = army.currentPoints+ req.body.currentPoints
    }
    if (army.currentPoints + req.body.currentPoints < 0) {
      army.currentPoints = 0
    } else {
      army.currentPoints += req.body.currentPoints
    }
    
    army.save()
    return res.status(201).json(army)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}



export {
  index,
  create,
  update,
  updatePoints,
}