import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  @Input('button-text') buttonText:String;
  private isLogged = this.userService.GetUserLoggedIn();
  private username = this.userService.username;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
