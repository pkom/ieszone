// scripts/seed.ts
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from 'backend/config/config.service.rayuela';
import { Course } from 'backend/modules/courses/entities/course.entity';
import { CourseDTO } from 'backend/modules/courses/dto/course.dto';
import { CoursesService } from 'backend/modules/courses/courses.service';

async function run() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const coursesService = new CoursesService(connection.getRepository(Course));

  const courseDTO = CourseDTO.from({
    course: '2020/2021',
    denomination: '2020/2021',
  });

  return await coursesService.create(courseDTO);
}

run()
  // tslint:disable-next-line: no-console
  .then((course) => console.log(`...creating course ${course.course}`))
  .catch((error) => console.error('seed error', error));
