import { ExamService } from './../../exams/shared/service/exam.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Patient } from 'src/app/main/patients/shared/model/patient.model';
import { MessageService } from '../../../shared/services/snackbar/message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import {ExamRequest} from '../../exams/shared/model/exam.model';
import {ExamFirestoreService} from '../../exams/shared/service/exam-firestore.service';

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
    private message: MessageService,
    private fb: FormBuilder,
    private depExamService: ExamService,
    private examService: ExamFirestoreService
  ) { }

  ngOnInit(): void {
    this.minExamDate = new Date().toISOString().slice(0, 10);
    this.populateForm(this.patient);
  }

  onSubmit(): void {
    const examRequest: ExamRequest = {
      ...this.newExamForm.value
    };

    this.examService.registerExam(examRequest).pipe(
      take(1)
    )
      .subscribe(() => {
          this.message.open(`Consulta cadastrada com Sucesso!`, MessageLevel.SUCCESS);
          this.dialogRef.close();
        },
        (error) => {
          this.message.open(error, MessageLevel.DANGER);
        });
  }

  private populateForm(patient: Patient): void {
    this.newExamForm.get('patient').setValue(patient);
    this.newExamForm.get('checkIn').setValue(null);
    this.newExamForm.get('finished').setValue(false);
  }
}
