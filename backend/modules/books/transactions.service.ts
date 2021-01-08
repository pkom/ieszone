import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { Copy } from './entities/copy.entity';
import { CourseStudent } from '../../modules/students/entities/course.student.entity';
import { Transaction } from './entities/transactions.entity';
import { CopyStatus, CopyTransaction } from '@iz/enum';
import { Level } from '../levels/entities/level.entity';
import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectRepository(Copy) private readonly copyRepository: Repository<Copy>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    @InjectRepository(CourseStudent)
    private readonly courseStudentRepository: Repository<CourseStudent>,
  ) {}

  async input(
    copyId: string,
    userId: string,
    courseStudentId: string,
  ): Promise<Copy> {
    const copy = await this.checkCopy(copyId);
    const user = await this.checkUser(userId);
    const courseStudent = await this.checkCourseStudent(courseStudentId);
    if (
      copy.status === CopyStatus.AVAILABLE ||
      copy.status === CopyStatus.DAMAGED
    ) {
      throw new BadRequestException(
        'Cannot input an available or damaged copy',
      );
    }
    copy.status = CopyStatus.AVAILABLE;
    copy.courseStudent = undefined;
    const transaction = this.transactionRepository.create({
      transaction: CopyTransaction.INPUT,
      courseStudent: courseStudent,
      user: user,
    });
    await this.transactionRepository.save(transaction);
    await this.copyRepository.save(copy);
    return this.copyRepository.findOne(copyId, {
      relations: ['transactions'],
    });
  }

  async output(copyId: string, userId: string, courseStudentId: string) {
    const copy = await this.checkCopy(copyId);
    const user = await this.checkUser(userId);
    const courseStudent = await this.checkCourseStudent(courseStudentId);
    if (copy.status === CopyStatus.UNAVAILABLE) {
      throw new BadRequestException('Cannot output an unavailable ');
    }

    const levelBook = copy.book.level;
    const course = courseStudent.course;

    if (!levelBook) {
      throw new BadRequestException('Book must have a level');
    }

    // select level.id from levels, groups, courses_groups, courses_groups_students
    // where
    //         level.id = groups.levelId and
    //         groups.id = courses_groups.groupId and
    //         courses_groups.courseId = course.id and
    //         courses_groups.id = courses_group_students.courseGroupId and
    //         courses_groups_students.courseStudentId = courseStudent.id

    const level = await this.levelRepository
      .createQueryBuilder('level')
      .leftJoinAndSelect('level.groups', 'group')
      .leftJoinAndSelect('group.courseGroups', 'courseGroup')
      .leftJoinAndSelect(
        'courseGroup.courseGroupStudents',
        'courseGroupStudent',
      )
      .leftJoinAndSelect('courseGroupStudent.courseStudents', 'courseStudent')
      .where('courseStudent.id = :courseStudentId', {
        courseStudentId: courseStudent.id,
      })
      .andWhere('courseGroup.courseId = :courseId', { courseId: course.id })
      .getOne();

    if (levelBook.id !== level.id) {
      throw new BadRequestException(
        'Cannot output copy to a different student level',
      );
    }

    copy.status = CopyStatus.UNAVAILABLE;
    copy.courseStudent = courseStudent;
    const transaction = this.transactionRepository.create({
      transaction: CopyTransaction.OUTPUT,
      courseStudent: courseStudent,
      user: user,
    });
    await this.transactionRepository.save(transaction);
    await this.copyRepository.save(copy);
    return this.copyRepository.findOne(copyId, {
      relations: ['transactions'],
    });
  }

  private async checkCopy(copyId: string) {
    const copy = await this.copyRepository.findOne(copyId, {
      where: { isActive: true },
    });
    if (!copy) {
      throw new NotFoundException('Copy not found or deactivated');
    }
    return copy;
  }

  private async checkUser(userId: string) {
    const user = await this.userRepository.findOne(userId, {
      where: {
        isActive: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found or deactivated');
    }
    return user;
  }

  private async checkCourseStudent(courseStudentId: string) {
    const courseStudent = await this.courseStudentRepository.findOne(
      courseStudentId,
    );
    if (!courseStudent) {
      throw new NotFoundException('Student not found in course');
    }
    return courseStudent;
  }
}
