import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";

import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import {
  AuthResponse,
  LoginUser,
  RegisterUser,
  User,
} from "../models/users.model";
import { NotificationService } from "./notification.service";

@Injectable()
export class AuthService implements OnDestroy {
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
    console.log("AuthService instance created.");
  }
  ngOnDestroy(): void {
    console.log("AuthService instance destroyed.");
  }

  register(user: RegisterUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + "/auth/register", user)
      .pipe(
        tap(({ token }) => {
          this.setToken(token);
          this.notificationService.success(
            "Register User",
            "Successfully registered."
          );
        }),
        catchError(this.handleError)
      );
  }

  login(user: LoginUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + "/auth/login", user)
      .pipe(
        tap(({ token }) => {
          this.setToken(token);
          this.notificationService.success(
            "Login User",
            "Successfully logged in."
          );
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
    this.notificationService.success("Logout", "Successfully logged out.");
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getCurrentUser(): Observable<User> {
    const email = this.decodeToken(this.getToken()).sub;
    return this.http
      .get<User>(environment.baseUrl + `/users/email/${email}`)
      .pipe(
        tap((data) =>
          this.notificationService.info(
            "Getting current user",
            "Successfully retreived current user."
          )
        ),
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  decodeToken(token: string): { sub: string; iat: number; exp: number } {
    return token ? jwt_decode(token) : null;
  }

  handleError(error: HttpErrorResponse) {
    this.notificationService.error(
      "Something went wrong " + error.status,
      error.message
    );

    return throwError(
      () =>
        new Error(
          `Something bad happend; please try again later. ${error.message}`
        )
    );
  }
}
