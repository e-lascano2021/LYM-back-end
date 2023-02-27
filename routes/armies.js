import { Router } from 'express'
import * as armiesCtrl from '../controllers/armies.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, armiesCtrl.index)
router.post('/', checkAuth, armiesCtrl.create)
router.put('/:id', checkAuth, armiesCtrl.update)


export { router }
