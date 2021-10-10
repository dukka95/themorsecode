import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResultService} from "../services/result.service";
import {ResultResponse} from "../models/result-response.model";
import {ResultRequest} from "../models/result-request.model";
import jwt_decode from "jwt-decode";
import {AuthenticationService} from "../services/authentication.service";
import {MorseService} from "../services/morse.service";

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  resultForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  serverResponse?: ResultResponse

  constructor(
    private formBuilder: FormBuilder,
    private resultService: ResultService,
    private authenticationService: AuthenticationService,
    private morseService: MorseService
    ) { }

  ngOnInit() {
    const token = <any> jwt_decode(this.authenticationService.currentTokenValue.value!);

    this.resultForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      result: [{value: this.morseService.encode(token.sub + ' : ' + token.exp), disabled: true}, Validators.required],
      githuburl: ['', Validators.required]
    });
  }

  get f() { return this.resultForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.resultForm.invalid) {
      return;
    }

    this.loading = true;
    this.resultService.sendResult(this.createFromForm())
      .subscribe({
        next: (response: ResultResponse) => {
          this.serverResponse = response;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  private createFromForm(): ResultRequest {
    return {
      ...new ResultRequest(),
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      result: this.f.result.value,
      githubUrl: this.f.githubUrl.value
    }
  }

}
