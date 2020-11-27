import { ExamService } from './../../exams/shared/service/exam.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Patient } from 'src/app/main/patients/shared/model/patient.model';
import { SnackbarService } from './../../../shared/services/snackbar/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  minExamDate: string;

  newExamForm = this.fb.group({
    patient: [''],
    date: [''],
    checkIn: [''],
    finished: ['']
  });

  examFormControls = {
    patient: this.newExamForm.get('patient'),
    date: this.newExamForm.get('date'),
    checkIn: this.newExamForm.get('checkIn'),
    finished: this.newExamForm.get('finished')
  };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public patient: Patient,
    public dialogRef: MatDialogRef<NewExamComponent>,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.minExamDate = new Date().toISOString().slice(0, 10);
    this.populateForm(this.patient);
  }

  onSubmit(): void {
    this.examService.register(this.newExamForm.value).pipe(
      take(1)
    )
      .subscribe(() => {
          this.snackbar.open(`Consulta cadastrada com Sucesso!`, MessageLevel.SUCCESS);
          this.dialogRef.close();
        },
        (error) => {
          this.snackbar.open(error, MessageLevel.DANGER);
        });
  }

  private populateForm(patient: Patient): void {
    this.newExamForm.get('patient').setValue(patient);
    this.newExamForm.get('checkIn').setValue(null);
    this.newExamForm.get('finished').setValue(false);
  }
}
