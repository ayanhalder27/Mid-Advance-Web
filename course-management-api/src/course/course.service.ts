import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
      public getAllCourses(): string {
        return "All cousrses";
      }
    
      public getCourseById(id: string): string {
        return `Course by id: ${id}`;
      }
    
      createCourse(): string {
        return "Create course";
      }
    
      updateCourse(id: string): string {
        return `Update course: ${id}`;
      }
    
      partialUpdateCourse(id: string): string {
        return `Partial update course: ${id}`;
      }
    
      deleteCourse(id: string): string {
        return `Delete course: ${id}`;
      }
}
