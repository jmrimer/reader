import { Injectable } from '@angular/core';
import { Quiz } from './Quiz';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { QuizSubmission } from './QuizSubmission';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) {
  }

  getQuizzes() {
    return this._http.get<Quiz[]>(`${environment.apiUrl}/quizzes`);
  }

  postAnswers(quizSubmission: QuizSubmission) {
    return this._http.post(
      `${environment.apiUrl}/quizzes`,
      quizSubmission
    )
  }

}
