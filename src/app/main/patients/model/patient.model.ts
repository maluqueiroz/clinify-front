import {PermissionsEnum} from './permissions.enum';

export interface Patient {
  name: string;
  birthDate: Date;
  healthPlan: string;
  // code: string;
  permission: PermissionsEnum;
  createdOn: Date;
}

export interface PatientDTO {
  name: string;
  birthDate: Date;
  healthPlan: string;
  code: string;
}
