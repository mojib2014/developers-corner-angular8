import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { AuthResponse, RegisterUser, User } from "../shared/models/users.model";
import { environment } from "src/environments/environment";

@Injectable()
export class UsersService implements OnDestroy {
  constructor(private http: HttpClient) {
    console.log("UsersService instance created.");
  }
  ngOnDestroy(): void {
    console.log("UsersService instance destroyed.");
  }

  getUserByEmail(email: string): Observable<AuthResponse> {
    return this.http
      .get<AuthResponse>(environment.baseUrl + `/users/email/${email}`)
      .pipe(catchError(this.handleError));
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(environment.baseUrl + `/${id}`)
      .pipe(catchError(this.handleError));
  }

  update(user: RegisterUser): Observable<any> {
    return this.http
      .put<any>(environment.baseUrl + `/users/${user.id}`, user)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete(environment.baseUrl + `/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);

    return throwError(
      () =>
        new Error(
          `Something bad happend; please try again later. ${error.message}`
        )
    );
  }
}
