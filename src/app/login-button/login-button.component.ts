import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  private isLogged = this.userService.GetUserLoggedIn();
  private email = this.userService.email;

  constructor(public userService:UserService, private router:Router) { }

  public LogOut()
  {
    this.userService.SetUserLoggedOut();
    this.router.navigate([""]);
  }

  ngOnInit() {
  }

}
