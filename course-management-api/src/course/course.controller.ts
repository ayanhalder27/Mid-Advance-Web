import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses(): any {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string): any {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() createCourseDto: CreateCourseDto): any {
    return this.courseService.createCourse(createCourseDto);
  }

  @Put(':id')
  updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): any {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  @Patch(':id')
  partialUpdateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): any {
    return this.courseService.partialUpdateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string): string {
    return this.courseService.deleteCourse(id);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCourseMaterial(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): any{
    return this.courseService.uploadCourseMaterial(id, file);
  }
}
