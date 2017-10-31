import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ValidatorService } from '../services/validator.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit
{
  // form itself
  form:FormGroup;

  name:FormControl;
  email:FormControl;
  password1:FormControl;
  password2:FormControl;
  nameMaxLength = 15;

  private url:string = this.userService.baseApiUrl + "/user/create";
  public errorMessage:string;

  constructor(public userService:UserService, public validatorService:ValidatorService, private http:Http, private router:Router) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.name = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]*"), Validators.minLength(3), Validators.maxLength(15)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.password1 = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.password2 = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
        name: this.name,
        email: this.email,
        passwordGroup: new FormGroup
        ({
            password1: this.password1,
            password2: this.password2
        })
    });
  }

  public CreateUser()
  {
    this.errorMessage = "";

    if(this.form.valid)
    {

      this.http.post
      (
        this.url,
        { name: this.name.value, password: this.password1.value, email: this.email.value }
      )
      .subscribe
      (
        data =>
        {
          const response = data.json();
          if(response["message"] === "OK")
          {
            this.userService.email = this.email.value;
            this.userService.name = this.name.value;
            this.userService.id = response["id"];
            this.userService.token = response["token"];
            this.userService.role = response["role"];

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
