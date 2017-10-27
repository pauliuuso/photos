import { Injectable } from '@angular/core';

@Injectable()
export class UserService
{

  private isLogged:boolean;
  public email:string;
  public name:string;
  public id:string;
  public token:string;
  public baseApiUrl = "http://photos.teroute.com/api";

  constructor(){}

  public SetUserLoggedIn()
  {
    this.isLogged = true;
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("token", this.token);
    localStorage.setItem("id", this.id);
    localStorage.setItem("email", this.email);
    localStorage.setItem("name", this.name);
  }

  public CheckUserInStorage()
  {
    if(localStorage.getItem("isLogged") == "true")
    {
      this.isLogged = true;
      this.email = localStorage.getItem("email");
      this.name = localStorage.getItem("name");
      this.id = localStorage.getItem("id");
      this.token = localStorage.getItem("token");
    }
  }

  public SetUserLoggedOut()
  {
    this.isLogged = false;
    this.email = "";
    this.name = "";
    this.id = "";
    this.token = "";
    localStorage.clear();
  }

  public GetUserLoggedIn()
  {
    return this.isLogged;
  }

}
