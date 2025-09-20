import { OpenAPI, CourseService, AboutService, ApiCourseCourseDocument } from '../shared/api/strapi';

// Configure the Strapi client
OpenAPI.BASE = process.env.STRAPI_URL || 'http://localhost:1337';
OpenAPI.TOKEN = process.env.STRAPI_API_TOKEN; // Bearer token for authentication

// Example usage in your backend routes
export async function getAllCourses(): Promise<ApiCourseCourseDocument[]> {
  try {
    const response = await CourseService.courseGetCourses();
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
}

export async function getCourseById(id: string): Promise<ApiCourseCourseDocument> {
  try {
    const response = await CourseService.courseGetCoursesById({
      id: parseInt(id),
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch course ${id}:`, error);
    throw error;
  }
}

export async function createCourse(courseData: {
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description?: any;
}): Promise<ApiCourseCourseDocument> {
  try {
    const response = await CourseService.coursePostCourses({
      data: courseData
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create course:', error);
    throw error;
  }
}

export async function getAbout() {
  try {
    const response = await AboutService.aboutGetAbout();
    return response.data;
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    throw error;
  }
}