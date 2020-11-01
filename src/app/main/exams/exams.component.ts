import { Observable } from 'rxjs';
import { ExamService } from './service/exam.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from './models/exam.model';
import { Patient } from '../users/model/patient.model';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  exams$: Observable<Exam[]>;

  columnsToDisplay = ['patient', 'healthPlan', 'date', 'checkIn', 'startExamBtn'];

  constructor(
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.exams$ = this.examService.getAllExams();
  }

  startExam(exam: Exam): void {
    // sets exam finished flag to true;

    console.log(`exam started for patient ${exam.patient.name}`);
  }

}
