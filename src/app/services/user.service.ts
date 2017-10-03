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

  constructor()
  {
    this.isLogged = false;
  }

  public SetUserLoggedIn()
  {
    this.isLogged = true;
  }

  public GetUserLoggedIn()
  {
    return this.isLogged;
  }

}
