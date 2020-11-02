import { SnackbarService } from './../../shared/services/snackbar/snackbar.service';
import { PatientService } from './../../shared/services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Patient } from './shared/model/patient.model';
import { take } from 'rxjs/operators';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  readonly patientsSubject = new Subject<Patient[]>();
  patients$: Observable<Patient[]>;

  columnsToDisplay = ['patient', 'healthPlan', 'birthDate', 'actionsRow'];


  constructor(
    private patientService: PatientService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.patients$ = this.patientsSubject;

    this.loadPatients();
  }

  deletePatient(patient: Patient): void {
    this.patientService.removeById(patient.id).pipe(take(1)).subscribe(() => {
        this.snackbar.open('Consulta Deletada!', MessageLevel.INFO);
        this.loadPatients();
      }
    );
  }

  private loadPatients(): void {
    this.patientService.getAll().pipe(take(1))
    .subscribe((patients: Patient[]): void => {
      this.patientsSubject.next(patients);
    });
  }

}
