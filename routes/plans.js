import { Router } from 'express'
import * as plansCtrl from '../controllers/plans.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:armyId', checkAuth, plansCtrl.create)
router.delete('/:id/:armyId', checkAuth, plansCtrl.delete)



export { router }