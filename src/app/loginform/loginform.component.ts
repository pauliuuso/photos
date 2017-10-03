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
  private data:Object;
  private errorMessage:string;

  constructor(private router:Router, private userService:UserService, private http:Http) { }

  ngOnInit()
  {
  }

  public LoginUser(event)
  {
    event.preventDefault();
    this.errorMessage = "";

    if(this.email != "" && this.password != "")
    {
      this.http.post(
      this.url,
      {email: this.email, password: this.password})
      .subscribe(
        data =>
        {
          // this.userService.username = data.
          this.data = data.json();
          if(this.data["message"] == "OK")
          {
            this.userService.email = this.email;
            this.userService.id = this.data["id"];
            this.userService.token = this.data["token"];
            this.userService.name = this.data["name"];

            this.userService.SetUserLoggedIn();
            this.router.navigate([""]);
          }
          else
          {
            this.errorMessage = this.data["message"];
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
