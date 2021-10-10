import { Component } from '@angular/core';
import {JwtResponse} from "./models/jwt-response.model";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentToken?: JwtResponse;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentToken.subscribe(token => this.currentToken = token);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
