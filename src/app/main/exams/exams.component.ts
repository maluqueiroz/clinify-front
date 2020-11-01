import { SnackbarService } from './../../core/services/snackbar.service';
import { Observable, Subject } from 'rxjs';
import { ExamService } from './service/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from './models/exam.model';
import { MessageLevel } from 'src/app/core/services/message-level.enum';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  examsSubject = new Subject<Exam[]>();
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
        this.snackbar.open('Consulta Deletada!', MessageLevel.INFO);
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
