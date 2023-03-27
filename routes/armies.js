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
router.post('/:id/reminders', checkAuth, armiesCtrl.createReminder)

router.put('/:id', checkAuth, armiesCtrl.update)
router.put('/:id/add-photo', checkAuth, armiesCtrl.addPhoto)
router.put('/:id/gifts/:giftId', checkAuth, armiesCtrl.updateGift)
router.put('/:id/reminders/:reminderId', checkAuth, armiesCtrl.updateReminder)

router.delete('/:id/gifts/:giftId', checkAuth, armiesCtrl.deleteGift)
router.delete('/:id/reminders/:reminderId', checkAuth, armiesCtrl.deleteReminder)

router.patch('/points/:id', checkAuth, armiesCtrl.updatePoints)



export { router }
