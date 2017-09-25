import { Injectable } from '@angular/core';

@Injectable()
export class UserService 
{

  private isLogged:boolean;
  public username:string;

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
