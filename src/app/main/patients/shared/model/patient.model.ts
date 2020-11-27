export interface Patient {
  id: string | number;
  name: string;
  birthDate: Date;
  healthPlan: string;
  code?: string;
}

export interface PatientRequest {
  name: string;
  birthDate: Date;
  healthPlan: string;
  code?: string;
}
