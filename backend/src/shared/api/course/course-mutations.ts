import { CourseService } from '../strapi';

/**
 * Create a new course (web admin only)
 */
export async function createCourse(data: {
    title: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: Array<any>;
    publishedAt: string;
    cover_image?: any;
    course_categories?: Array<string>;
    authors?: Array<string>;
    course_sections?: Array<string>;
}) {
    return CourseService.coursePostCourses(
        ['title', 'level', 'description', 'createdAt', 'updatedAt', 'publishedAt'], // Fields: Return all course fields in response
        ['cover_image', 'course_categories', 'authors', 'course_sections'],         // Relations: Return populated related data in response
        undefined,                                                                  // Status: No status filter (will use publishedAt from data)
        { data }                                                                    // Data: Course data to create
    );
}

/**
 * Update an existing course (web admin only)
 */
export async function updateCourse(
    id: string,
    data: {
        title?: string;
        level?: 'Beginner' | 'Intermediate' | 'Advanced';
        description?: Array<any>;
        publishedAt?: string;
        cover_image?: any;
        course_categories?: Array<string>;
        authors?: Array<string>;
        course_sections?: Array<string>;
    }
) {
    return CourseService.coursePutCoursesById(
        id,                                                                         // ID: Course document ID to update
        ['title', 'level', 'description', 'createdAt', 'updatedAt', 'publishedAt'], // Fields: Return all course fields in response
        ['cover_image', 'course_categories', 'authors', 'course_sections'],         // Relations: Return populated related data in response
        undefined,                                                                  // Status: No status filter
        { data }                                                                    // Data: Partial course data to update (only provided fields will be updated)
    );
}

/**
 * Delete a course (web admin only)
 */
export async function deleteCourse(id: string) {
    return CourseService.courseDeleteCoursesById(
        id // ID: Course document ID to delete (returns deleted course data)
    );
}