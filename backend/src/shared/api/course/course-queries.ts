import { CourseService } from '../strapi';

/**
 * Get all courses for mobile app (basic fields only)
 */
export async function getAllCoursesForMobile(options?: {
    filters?: Record<string, any>;
    pagination?: { page?: number; pageSize?: number };
    sort?: string | Array<string>;
}) {
    return CourseService.courseGetCourses(
        ['title', 'level', 'description'], // Fields: Only basic info needed for mobile
        options?.filters,                  // Filters: User-defined filtering (e.g., { level: 'Beginner' })
        undefined,                         // Search: No full-text search
        options?.pagination as any,        // Pagination: Page-based or offset-based pagination
        options?.sort as any,              // Sort: Order by field(s) (e.g., 'title' or { createdAt: 'desc' })
        'cover_image',                     // Relations: Lookup and retrieve cover_image file details
        'published'                        // Status: Only published courses (mobile users can't see drafts)
    );
}

/**
 * Get all courses for web admin (all fields)
 */
export async function getAllCoursesForWeb(options?: {
    filters?: Record<string, any>;
    pagination?: { page?: number; pageSize?: number };
    sort?: string | Array<string>;
}) {
    return CourseService.courseGetCourses(
        ['title', 'level', 'description', 'createdAt', 'updatedAt', 'publishedAt'], // Fields: All fields for admin interface
        options?.filters,                                                           // Filters: User-defined filtering
        undefined,                                                                  // Search: No full-text search
        options?.pagination as any,                                                 // Pagination: Page-based or offset-based pagination
        options?.sort as any,                                                       // Sort: Order by field(s)
        ['cover_image', 'course_categories', 'authors', 'course_sections']          // Relations: Lookup all related data (images, categories, authors, sections)
        // Status: undefined = both draft and published courses (admin can see everything)
    );
}

/**
 * Get a single course by ID (full details for both web and mobile)
 */
export async function getCourseById(id: string) {
    return CourseService.courseGetCoursesById(
        id,                                                                         // ID: Course document ID to retrieve
        ['title', 'level', 'description', 'createdAt', 'updatedAt', 'publishedAt'], // Fields: All course fields for detail view
        ['cover_image', 'course_categories', 'authors', 'course_sections']          // Relations: Lookup all related data for complete course details
        // Status: undefined = can retrieve both draft and published courses
    );
}