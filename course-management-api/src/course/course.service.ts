import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import type { Multer } from 'multer';

@Injectable()
export class CourseService {
      private courses: CreateCourseDto[];
      constructor() {
        this.courses = [
          {
            id: 1,
            name: 'Introduction to Programming',
            code: 'CSE101',
            instructor: 'Rahim Ahmed',
            credits: 3,
            description: 'Fundamentals of programming using C.',
          },
          {
            id:2,
            name: 'Object-Oriented Programming',
            code: 'CSE201',
            instructor: 'Karim Hasan',
            credits: 4,
            description: 'OOP concepts using Java.',
          },
          {
            id:3,
            name: 'Data Structures and Algorithms',
            code: 'CSE301',
            instructor: 'Nusrat Jahan',
            credits: 3,
            description: 'Study of data structures and algorithm design.',
          },
          {
            id:4,
            name: 'Database Management Systems',
            code: 'CSE303',
            instructor: 'Sabbir Hossain',
            credits: 3,
            description: 'Database design, SQL, and normalization.',
          },
          {
            id:5,
            name: 'Web Technologies',
            code: 'CSE401',
            instructor: 'Tanvir Islam',
            credits: 3,
            description: 'Frontend and backend web development.',
          },
        ];
      }
      public getAllCourses(): any {
        return {
          message: "All courses fetched successfully",
          data: this.courses
        };
      }
    
      public getCourseById(id: string): any {
        return {
          message: "Course fetched successfully",
          data: this.courses.find((course)=> course.id === parseInt(id))
        };
      }
    
      public createCourse(createCourseDto: CreateCourseDto): any {
        this.courses.push(createCourseDto);
        return {
          message: "Course created successfully",
          data: createCourseDto
        };
      }
    
      public updateCourse(id: string, updateCourseDto: UpdateCourseDto): any {
        return {
          message: `Course updated successfully, id: ${id}`,
          data: updateCourseDto
        };
      }
    
      public partialUpdateCourse(id: string, updateCourseDto: UpdateCourseDto): any {
        return {
          message: `Course patched successfully, id: ${id}`,
          data: updateCourseDto
        };
      }
    
      public deleteCourse(id: string): string {
        return `Course deleted successfully, id: ${id}`
      }

      public uploadCourseMaterial(id: string, file: Express.Multer.File): any{
        return {
          message: "Material uploaded successfully",
          courseId: id,
          filename: file.originalname, 
          path: file.path
        }
      }
}
