import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { Exam } from './shared/model/exam.model';
import { ExamService } from './shared/service/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  readonly examsSubject = new Subject<Exam[]>();
  exams$: Observable<Exam[]>;

  columnsToDisplay = ['patient', 'healthPlan', 'date', 'checkIn', 'actionsRow'];

  constructor(
    private examService: ExamService,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.exams$ = this.examsSubject;

    this.loadExams();
  }

  startExam(exam: Exam): void {
    // sets exam finished flag to true;

    console.log(`exam started for patient ${exam.patient.name}`);
  }

  deleteExam(exam: Exam): void {
    this.examService.removeById(exam.id).pipe(take(1)).subscribe(() => {
        this.snackbar.open('Paciente Deletada!', MessageLevel.INFO);
        this.loadExams();
      }
    );
  }

  private loadExams(): void {
    this.examService.getAll().pipe(take(1))
    .subscribe((exams: Exam[]): void => {
      this.examsSubject.next(exams);
    });
  }
}
