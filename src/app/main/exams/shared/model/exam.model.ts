import { Patient } from 'src/app/main/patients/shared/model/patient.model';

export interface Exam {
  id: number | string;
  patient: Patient;
  date: Date;
  finished: boolean;
  checkIn: Date | undefined;
}

export type ExamRequest = Omit<Exam, 'id'>;
