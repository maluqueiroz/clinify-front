import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  static readonly EXAM_RESOURCE_URL = environment.apiUrl + 'exams';

  constructor(
    private http: HttpClient
  ) { }

  getAllExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(ExamService.EXAM_RESOURCE_URL);
  }
}
