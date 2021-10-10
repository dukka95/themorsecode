import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ResultRequest} from "../models/result-request.model";
import {ResultResponse} from "../models/result-response.model";

@Injectable({ providedIn: 'root' })
export class ResultService {

  constructor(private http: HttpClient) {}

  sendResult(resultRequest: ResultRequest) {
    return this.http.post<ResultResponse>(`${environment.apiUrl}/result`, resultRequest);
  }
}
