import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

  constructor() { }

  public Match(string1:string, string2:string)
  {
    return string1 === string2;
  }

}
