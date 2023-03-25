import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.put('/', checkAuth, profilesCtrl.update)
router.put('/add-photo', checkAuth, profilesCtrl.addPhoto)
router.get('/', checkAuth, profilesCtrl.show)

export { router }
