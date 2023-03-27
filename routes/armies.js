import { Router } from 'express'
import * as armiesCtrl from '../controllers/armies.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, armiesCtrl.index)
router.get('/:id', checkAuth, armiesCtrl.show)

router.post('/', checkAuth, armiesCtrl.create)
router.post('/:id/gifts', checkAuth, armiesCtrl.createGift)

router.put('/:id', checkAuth, armiesCtrl.update)
router.put('/:id/add-photo', checkAuth, armiesCtrl.addPhoto)
router.put('/:id/gifts/:giftId', checkAuth, armiesCtrl.updateGift)
// router.put('/:id/gifts/:giftId', checkAuth, armiesCtrl.updateGift)

router.delete('/:id/gifts/:giftId', checkAuth, armiesCtrl.deleteGift)

router.patch('/points/:id', checkAuth, armiesCtrl.updatePoints)



export { router }
