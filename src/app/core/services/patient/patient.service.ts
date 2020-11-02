import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/main/patients/shared/model/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private static readonly RESOURCE_URL = environment.apiUrl + 'patients';

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string): Observable<Patient> {
    return this.http.get<Patient[]>(PatientService.RESOURCE_URL, { params: { username }}).pipe(
      map((queryReturn: Patient[]) => {
        if (queryReturn.length === 0) {
          throw Error('Paciente Inexistente');
        }

        const firstPatientFound: Patient = queryReturn[0];

        return firstPatientFound;
      })
    );
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(
      PatientService.RESOURCE_URL
    ).pipe(
      map((patientsDTO: Patient[]): Patient[] => {
        return patientsDTO.map((patientDTO: Patient): Patient => {
          return {
            ...patientDTO,
          };
        });
      })
    );
  }

  registerPatient(userRegistrationData: Partial<Patient>): any {
    const { name, birthDate, healthPlan } = userRegistrationData;
    const patientDTO = {
      name,
      birthDate,
      healthPlan
    };

    return this.http.post<Patient>(
      PatientService.RESOURCE_URL,
      patientDTO,
      { headers: {'Content-Type': 'application/json; charset=utf-8'} }
    );
  }
}
