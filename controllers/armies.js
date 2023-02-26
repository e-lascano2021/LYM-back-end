import {Army} from "../models/army.js"
import {Profile} from "../models/profile.js"


function index(req, res) {
  Profile.findById(req.user.profile)
  .then(myProfile => {
    res.json(myProfile.armies)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}






export {
  index
}