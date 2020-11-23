import { from, Observable } from 'rxjs';
import { Patient, PatientRequest } from './../model/patient.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IPatientService } from '../model/patient-service.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PatientFirestoreService implements IPatientService {
  static readonly COLLECTION_NAME = 'patients';

  static collection: AngularFirestoreCollection<Patient | PatientRequest>;

  constructor(private afs: AngularFirestore) {
    PatientFirestoreService.collection = afs.collection(
      PatientFirestoreService.COLLECTION_NAME
    );
  }

  getPatientById(id: string | number): Observable<Patient> {
    return PatientFirestoreService.collection.doc(id.toString()).get().pipe(map((document): Patient => {
      const { name, birthDate, healthPlan } = document.data();

      return {
        id: document.id,
        name,
        birthDate,
        healthPlan
      };
    }));
  }

  removeById(id: string | number): Observable<void> {
    return from(PatientFirestoreService.collection.doc(id.toString()).delete());
  }

  getAll(): Observable<Patient[]> {
    return PatientFirestoreService.collection.valueChanges({ idField: 'id' });
  }

  registerPatient(
    patientRegistrationData: Patient
  ): Observable<PatientRequest> {
    const { name, birthDate, healthPlan } = patientRegistrationData;
    const patientDTO = {
      name,
      birthDate,
      healthPlan,
    };

    return from(PatientFirestoreService.collection.add(patientDTO)).pipe(
      map(
        (): PatientRequest => {
          return patientDTO;
        }
      )
    );
  }
}
