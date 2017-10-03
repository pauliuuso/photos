import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit
{
  public email:string;
  public password:string;

  private url:string = this.userService.baseApiUrl + "/user/login";
  private errorMessage:string;

  constructor(private router:Router, private userService:UserService, private http:Http) { }

  ngOnInit()
  {
  }

  public LoginUser(event)
  {
    event.preventDefault();
    this.errorMessage = "";

    if(this.email !== "" && this.password !== "")
    {
      this.http.post(
      this.url,
      {email: this.email, password: this.password})
      .subscribe(
        data =>
        {
          // this.userService.username = data.
          const response = data.json();
          if(response["message"] === "OK")
          {
            this.userService.email = this.email;
            this.userService.id = response["id"];
            this.userService.token = response["token"];
            this.userService.name = response["name"];

            this.userService.SetUserLoggedIn();
            this.router.navigate([""]);
          }
          else
          {
            this.errorMessage = response["message"];
          }
        },
        error =>
        {
          this.errorMessage = error.message;
        }
      );
    }
  }
}
