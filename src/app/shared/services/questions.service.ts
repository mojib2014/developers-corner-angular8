import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { Question } from "../models/questions.model";
import { NotificationService } from "./notification.service";

@Injectable()
export class QuestionsService implements OnDestroy {
  stackExchangeQuery: string =
    "https://api.stackexchange.com/2.3/search?order=desc&sort=activity&site=stackoverflow&tagged=";

  constructor(
    private http: HttpClient,
    private notificationSvc: NotificationService
  ) {
    console.log("QuestionsService instance created.");
  }
  ngOnDestroy(): void {
    console.log("QuestionsService instance destroyed.");
  }

  create(question: Question): Observable<any> {
    return this.http
      .post<any>(environment.baseUrl + `/user/questions`, question)
      .pipe(
        tap((data) =>
          this.notificationSvc.success(
            "Create question",
            "Successfully created."
          )
        ),
        catchError(this.handleError)
      );
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http
      .get<Question>(environment.baseUrl + `/user/questions/${id}`)
      .pipe(
        tap(() =>
          this.notificationSvc.success(
            "Questions",
            "Successfully retreived a question by id."
          )
        ),
        catchError(this.handleError)
      );
  }

  getQuestionByUserId(id: number): Observable<Question[]> {
    return this.http
      .get<Question[]>(
        environment.baseUrl + `/user/questions/question?userId=${id}`
      )
      .pipe(
        tap(() =>
          this.notificationSvc.success(
            "Questions",
            "Successfully retreived users questions"
          )
        ),
        catchError(this.handleError)
      );
  }

  getQuestionByUsername(username: string): Observable<Question> {
    return this.http
      .get<Question>(
        environment.baseUrl + `/user/questions/question/${username}`
      )
      .pipe(catchError(this.handleError));
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<any>(environment.baseUrl + `/user/questions`).pipe(
      tap((data) =>
        this.notificationSvc.success(
          "Questions",
          "Successfully retreived all user questions"
        )
      ),
      catchError(this.handleError)
    );
  }

  update(question: Question): Observable<any> {
    return this.http
      .put<any>(
        environment.baseUrl + `/user/questions/${question.id}`,
        question
      )
      .pipe(
        tap(() =>
          this.notificationSvc.success(
            "Questions",
            "Successfully updated a question."
          )
        ),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.baseUrl + `/user/questions/${id}`).pipe(
      tap(() =>
        this.notificationSvc.success(
          "Questions",
          "Successfully deleted a question."
        )
      ),
      catchError(this.handleError)
    );
  }

  // ************* Fetch data from SOVF and MDN **************
  fetchResourceFromStackOverFlow(
    tags: string,
    question: string
  ): Observable<any> {
    this.stackExchangeQuery += tags + "&intitle=" + question;
    return this.http.get<any>(this.stackExchangeQuery).pipe(
      tap(() =>
        this.notificationSvc.success(
          "Questions",
          "Successfully retreived Stackoverflow answers."
        )
      ),
      catchError(this.handleError)
    );
  }

  private handleError({ error }: HttpErrorResponse) {
    this.notificationSvc.error("Questions " + error.httpStatus, error.message);
    return throwError(
      () =>
        new Error(`Something bad happened; please try again later. ${error}`)
    );
  }
}
