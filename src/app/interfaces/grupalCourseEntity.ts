import { studentEntity } from './studentEntity';
export class grupalCourseEntity {
  id: number;
  name: string;
  idTeacher: number;
  picture?: any;
  classTime?: any;
  fechaDeCreacion: string;
  studentes: studentEntity[];
  description?: any;
  urlMeet?: string;
  price?: number;
}
