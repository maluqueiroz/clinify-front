import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserDTO } from 'src/app/main/model/user.model';
import { PermissionsEnum } from 'src/app/main/model/permissions.enum';
import { environment } from 'src/environments/environment';
import {Patient, PatientDTO} from '../../../main/model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private static readonly RESOURCE_URL = environment.apiUrl + 'patients';

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User[]>(PatientService.RESOURCE_URL, { params: { username }}).pipe(
      map((queryReturn: User[]) => {
        if (queryReturn.length === 0) {
          throw Error('Paciente Inexistente');
        }

        const firstUserFound: User = queryReturn[0];

        return firstUserFound;
      })
    );
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<PatientDTO[]>(
      PatientService.RESOURCE_URL
    ).pipe(
      map((patientsDTO: PatientDTO[]): Patient[] => {
        return patientsDTO.map((patientDTO: PatientDTO): Patient => {
          return {
            ...patientDTO,
            createdOn: new Date(patientDTO.createdOn)
          };
        });
      })
    );
  }

  registerPatient(userRegistrationData: Partial<Patient>): any {
    const { name, birthDate, convenio } = userRegistrationData;
    const patientDTO: PatientDTO = {
      name,
      birthDate,
      convenio,
      permission: PermissionsEnum.DEFAULT,
      createdOn: (new Date()).toISOString()
    };

    return this.http.post<PatientDTO>(
      PatientService.RESOURCE_URL,
      patientDTO,
      { headers: {'Content-Type': 'application/json; charset=utf-8'} }
    );
  }
}
