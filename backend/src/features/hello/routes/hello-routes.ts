import { Router } from 'express';
import { getHello, getHelloWithName, postHello } from '../controllers/hello-controller';

const router = Router();

// GET /api/hello
router.get('/', getHello);

// GET /api/hello/:name
router.get('/:name', getHelloWithName);

// POST /api/hello
router.post('/', postHello);

export { router as helloRoutes };