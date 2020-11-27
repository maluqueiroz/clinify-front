import {Injectable} from '@angular/core';
import {IExamService} from '../model/exam-service.model';
import {from, Observable} from 'rxjs';
import {Exam, ExamRequest} from '../model/exam.model';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExamFirestoreService implements IExamService {
  private readonly exams$: Observable<Exam[]>;

  private readonly EXAMS_COLLECTION = 'exams';

  private readonly collection: AngularFirestoreCollection<Exam | ExamRequest>;

  constructor(
    private afs: AngularFirestore
  ) {
    this.collection = afs.collection(this.EXAMS_COLLECTION);
    this.exams$ = this.collection.valueChanges({idField: 'id'});
  }

  getAll(): Observable<Exam[]> {
    return this.exams$;
  }

  registerExam(newExam: ExamRequest): Observable<string> {
    return from(this.collection.add(newExam)).pipe(
      map((newExamDocument): string => {
        return newExamDocument.id;
      })
    );
  }

  removeById(examId: number | string): Observable<void> {
    const inputExamId = typeof examId === 'string' ? examId : examId.toString();

    return from(this.collection.doc(inputExamId).delete());
  }
}
