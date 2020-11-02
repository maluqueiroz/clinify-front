import { Patient } from '../../patients/model/patient.model';

export interface Exam {
  patient: Patient;
  date: Date;
  finished: boolean;
  checkIn: Date | undefined;
}
