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





export {
  index,
  create
}