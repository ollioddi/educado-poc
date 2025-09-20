import express from 'express';
import { OpenAPI, CourseService, CourseCategoryService } from '../shared/api/strapi';

const router = express.Router();

// Configure Strapi client
OpenAPI.BASE = process.env.STRAPI_URL || 'http://localhost:1337';
OpenAPI.TOKEN = process.env.STRAPI_API_TOKEN;

// GET /api/courses - List all courses
router.get('/courses', async (req, res) => {
  try {
    const response = await CourseService.courseGetCourses({
      populate: ['cover_image', 'course_categories', 'authors'],
      sort: ['createdAt:desc']
    });
    
    res.json({
      success: true,
      data: response.data,
      meta: response.meta
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
});

// GET /api/courses/:id - Get a specific course
router.get('/courses/:id', async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const response = await CourseService.courseGetCoursesById({
      id: courseId,
      populate: ['cover_image', 'course_categories', 'authors', 'course_sections']
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error(`Failed to fetch course ${req.params.id}:`, error);
    res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }
});

// POST /api/courses - Create a new course
router.post('/courses', async (req, res) => {
  try {
    const { title, level, description, course_categories } = req.body;
    
    const response = await CourseService.coursePostCourses({
      data: {
        title,
        level,
        description,
        course_categories
      }
    });
    
    res.status(201).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Failed to create course:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create course'
    });
  }
});

// GET /api/course-categories - List all course categories
router.get('/course-categories', async (req, res) => {
  try {
    const response = await CourseCategoryService.courseCategoryGetCourseCategories();
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Failed to fetch course categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course categories'
    });
  }
});

export default router;