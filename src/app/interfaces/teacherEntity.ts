import { courseEntity } from './coursesEntity';
export class teacherEntity {

  id: number;
  idUser?: any;
  username: string;
  enabled: boolean;
  name: string;
  lastName: string;
  phone: string;
  enabledPlatform: boolean;
  meetUrl: string;
  busy?: any;
  email: string;
  fechaDeCreacion: string;
  courses: courseEntity[];
  termsAndConditions: boolean;
  picture: string;
  hourCost: number;
  description: string;
  education: string;
  money: number;
  profile: string;
  retirements: [];
}