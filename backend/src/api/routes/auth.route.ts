import { Router } from 'express';
import * as controller from '../controllers/auth.control';

const router: Router = Router();

router.post('/register', controller.Register);

const authRoutes: Router = router;

export default authRoutes;