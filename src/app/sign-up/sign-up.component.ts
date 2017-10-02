import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  // form itself
  form:FormGroup;

  name:FormControl;
  username:FormControl;
  password1:FormControl;
  password2:FormControl;
  passwordsMatch = false;

  private url:string = this.userService.baseApiUrl + "/user/create";
  private errorMessage:string;

  constructor(private userService:UserService) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.name = new FormControl('', Validators.required);
    this.username = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.password1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.password2 = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
        name: this.name,
        username: this.username,
        passwordGroup: new FormGroup
        ({
            password1: this.password1,
            password2: this.password2
        })
    });
  }

  public Match(string1:string, string2:string)
  {
    return string1 === string2;
  }

  public CreateUser(event)
  {
    event.preventDefault();
    this.errorMessage = "";

  }

}
