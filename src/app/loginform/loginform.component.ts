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
  public username:string;
  public password:string;
  private url:string = "http://photos.local/api/user/login";

  constructor(private router:Router, private userService:UserService, private http:Http) { }

  ngOnInit() 
  {
  }

  public LoginUser(event)
  {
    event.preventDefault();

    if(this.username == "p.jazauskas@gmail.com" && this.password == "freedom1000")
    {
      this.userService.SetUserLoggedIn();
      this.userService.username = this.username;
      this.router.navigate(['/dashboard']);

      this.http.post(this.url, {name: this.username, password: this.password}).subscribe(result => console.log(result));
    }

  }

}
