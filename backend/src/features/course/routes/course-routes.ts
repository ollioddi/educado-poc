import { Router } from 'express';
import {
    getCoursesForMobile,
    getCoursesForWeb,
    getCourse,
    createNewCourse,
    updateExistingCourse,
    deleteExistingCourse,
} from '../controllers/course-controller';

const router: Router = Router();

// GET routes
router.get('/mobile', getCoursesForMobile);  // Mobile app courses
router.get('/web', getCoursesForWeb);        // Web admin courses
router.get('/:id', getCourse);               // Single course

// POST/PUT/DELETE routes (web admin only)
router.post('/', createNewCourse);           // Create course
router.put('/:id', updateExistingCourse);    // Update course
router.delete('/:id', deleteExistingCourse); // Delete course

export { router as courseRoutes };