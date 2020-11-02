import { Patient } from './../../patients/model/patient.model';

export interface Exam {
  id: number;
  patient: Patient;
  date: Date;
  finished: boolean;
  checkIn: Date | undefined;
}
