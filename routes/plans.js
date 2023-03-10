import { Router } from 'express'
import * as plansCtrl from '../controllers/plans.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:id', checkAuth, plansCtrl.create)



export { router }