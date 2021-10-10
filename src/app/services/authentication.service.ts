import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {JwtResponse} from "../models/jwt-response.model";
import {JwtRequest} from "../models/jwt-request.model";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<JwtResponse>;
  public currentToken: Observable<JwtResponse>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<JwtResponse>(JSON.parse(<string>localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): JwtResponse {
    return this.currentTokenSubject.value;
  }

  login(jwtRequest: JwtRequest) {
    return this.http.post<JwtResponse>(`${environment.apiUrl}/auth`, jwtRequest)
      .pipe(map((token: JwtResponse) => {
        localStorage.setItem('currentToken', JSON.stringify(token));
        this.currentTokenSubject.next(token);
        return token;
      }));
  }

  logout() {
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next({});
  }
}
