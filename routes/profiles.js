import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.get('/:id', checkAuth, profilesCtrl.show)
router.patch('/love', checkAuth, profilesCtrl.update)

export { router }
