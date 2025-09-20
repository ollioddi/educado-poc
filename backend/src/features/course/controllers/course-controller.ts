import { Request, Response } from 'express';
import { getAllCoursesForMobile, getAllCoursesForWeb, getCourseById } from '@shared/api/course/course-queries';
import { createCourse, updateCourse, deleteCourse } from '@shared/api/course/course-mutations';

/**
 * GET /api/courses/mobile - Get courses for mobile app
 */
export async function getCoursesForMobile(req: Request, res: Response) {
    try {
        const { page, pageSize, sort, ...filters } = req.query;

        const pagination = page || pageSize ? {
            page: Number(page) || 1,
            pageSize: Number(pageSize) || 10
        } : undefined;

        const result = await getAllCoursesForMobile({
            filters: Object.keys(filters).length > 0 ? filters as Record<string, any> : undefined,
            pagination,
            sort: sort as string,
        });

        res.json(result);
    } catch (error) {
        console.error('Error fetching courses for mobile:', error);
        res.status(500).json({ error: 'Failed to fetch courses for mobile' });
    }
}

/**
 * GET /api/courses/web - Get courses for web admin
 */
export async function getCoursesForWeb(req: Request, res: Response) {
    try {
        const { page, pageSize, sort, ...filters } = req.query;

        const pagination = page || pageSize ? {
            page: Number(page) || 1,
            pageSize: Number(pageSize) || 10
        } : undefined;

        const result = await getAllCoursesForWeb({
            filters: Object.keys(filters).length > 0 ? filters as Record<string, any> : undefined,
            pagination,
            sort: sort as string,
        });

        res.json(result);
    } catch (error) {
        console.error('Error fetching courses for web:', error);
        res.status(500).json({ error: 'Failed to fetch courses for web' });
    }
}

/**
 * GET /api/courses/:id - Get single course
 */
export async function getCourse(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await getCourseById(id);
        res.json(result);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(404).json({ error: 'Course not found' });
    }
}

/**
 * POST /api/courses - Create new course (web admin only)
 */
export async function createNewCourse(req: Request, res: Response) {
    try {
        const result = await createCourse(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(400).json({ error: 'Failed to create course' });
    }
}

/**
 * PUT /api/courses/:id - Update course (web admin only)
 */
export async function updateExistingCourse(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await updateCourse(id, req.body);
        res.json(result);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(400).json({ error: 'Failed to update course' });
    }
}

/**
 * DELETE /api/courses/:id - Delete course (web admin only)
 */
export async function deleteExistingCourse(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await deleteCourse(id);
        res.json(result);
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(400).json({ error: 'Failed to delete course' });
    }
}