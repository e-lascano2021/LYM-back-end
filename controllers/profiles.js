import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  })
}

function show (req, res) {
  console.log(req.user.profile)
  Profile.findById(req.user.profile)
  .then(myProfile => {
    res.json(myProfile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update (req,res) {
  req.body.loveTypes = req.body.loveTypes?.map(el => {return el.value})
  req.body.loveLanguages = req.body.loveLanguages?.map(el => {return el.value})
  Profile.findById(req.user.profile)
  .then( myProfile => {
    myProfile.loveTypes = req.body.loveTypes
    myProfile.loveLanguages = req.body.loveLanguages
    myProfile.save()
    res.json(myProfile)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}



export { 
  index, 
  addPhoto,
  show,
  update
}
