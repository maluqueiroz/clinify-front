import { Patient } from 'src/app/main/patients/shared/model/patient.model';
import { NewExamComponent } from './new-exam/new-exam.component';
import { SnackbarService } from './../../shared/services/snackbar/snackbar.service';
import { PatientService } from './../../shared/services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { MatDialog } from '@angular/material/dialog';
import { NewPatientComponent } from './new-patient/new-patient.component';

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
    private snackbar: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.patients$ = this.patientsSubject;

    this.loadPatients();
  }

  openNewPatientDialog(): void {
    const dialogRef = this.dialog.open(NewPatientComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.loadPatients();
    });
  }

  openNewExamDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(NewExamComponent, {
      width: '600px',
      data: patient
    });
  }

  deletePatient(patient: Patient): void {
    this.patientService.removeById(patient.id).pipe(take(1)).subscribe(() => {
        this.snackbar.open('Paciente Deletado!', MessageLevel.INFO);
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
