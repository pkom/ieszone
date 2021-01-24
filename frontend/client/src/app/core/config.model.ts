export interface Config {
  center: string;
  code: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  url: string;
  headMaster: string;
  defaultCourse: Course;
  selectedCourseId: string;
}

export interface Course {
  id: string;
  course: string;
  denomination: string;
}
