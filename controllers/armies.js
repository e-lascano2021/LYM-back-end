import { v2 as cloudinary } from 'cloudinary'
import {Army} from "../models/army.js"
import {Profile} from "../models/profile.js"


function index(req, res) {
  Profile.findById(req.user.profile)
  .populate("armies")
  .then(myProfile => {
    res.status(200).json(myProfile.armies)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}


function show(req, res) {
  Profile.findById(req.user.profile)
  .populate("armies")
  .then(myProfile => {
    const soldier = myProfile.armies.find(soldier => soldier.equals(req.params.id))
    if(soldier){
      Army.findById(req.params.id)
      .populate({
        path: "plans",
        populate: {path: "who"}
      })
      .then(army => {
        res.status(200).json(army)
      })
    } 
    else {
      res.status(500).json({err: 'You can only access an army that belongs to you'})
    }
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
      res.status(200).json(army)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({err: err.errmsg})
    })
  })
}

function update (req, res) {
  req.body.loveTypes = req.body.loveTypes?.map(el => {return el.value})
  req.body.loveLanguages = req.body.loveLanguages?.map(el => {return el.value})
  Army.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedArmy => {
    res.status(200).json(updatedArmy)
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
    return res.status(200).json(army)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Army.findById(req.params.id)
  .then(army => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      army.image = image.url
      army.save()
      .then(army => {
        res.status(201).json(army)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  })
}

//* gifts controllers
function createGift(req, res) {
  Army.findById(req.params.id)
  .then(army => {
    army.gifts.push(req.body)
    army.save()
    .then(() => {
      res.status(201).json(army.gifts.findLast((element) => element))
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function deleteGift(req, res){
  Army.findById(req.params.id)
  .then(army => {
    army.gifts.remove({_id: req.params.giftId})
    army.save()
    .then(() => {
      res.status(201).json(army.gifts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function updateGift(req, res){
  Army.findById(req.params.id)
  .then(army => {
    for(const key in req.body){
      army.gifts.id(req.params.giftId)[key] = req.body[key]
    }
    army.save()
    .then(() => {
      res.status(201).json(army.gifts.id(req.params.giftId))
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

//* reminder controllers
function createReminder(req, res) {
  Army.findById(req.params.id)
  .then(army => {
    army.reminders.push(req.body)
    army.save()
    .then(() => {
      res.status(201).json(army.reminders.findLast((element) => element))
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function deleteReminder(req, res){
  Army.findById(req.params.id)
  .then(army => {
    army.reminders.remove({_id: req.params.reminderId})
    army.save()
    .then(() => {
      res.status(201).json(army.reminders)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function updateReminder(req, res){
  Army.findById(req.params.id)
  .then(army => {
    for(const key in req.body){
      army.reminders.id(req.params.reminderId)[key] = req.body[key]
    }
    army.save()
    .then(() => {
      res.status(201).json(army.reminders.id(req.params.reminderId))
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  index,
  show,
  create,
  update,
  updatePoints,
  addPhoto,
  createGift,
  deleteGift,
  updateGift,
  createReminder,
  deleteReminder,
  updateReminder
}