export interface Patient {
  id: number;
  name: string;
  birthDate: Date;
  healthPlan: string;
  code?: string;
}
