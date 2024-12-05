import { courses, user_courses, users } from 'src/utils/entity/db.entity';

export const usersProvider = {
  provide: 'USER_MODEL',
  useValue: users,
};

export const coursesProvider = {
  provide: 'COURSES_MODEL',
  useValue: courses,
};

export const userCoursesProvider = {
  provide: 'USER_COURSES_MODEL',
  useValue: user_courses,
};
