import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit
{
  errorMessage: string;
  imageError: string;
  imageSelected = false;
  form: FormGroup;
  pictureName: FormControl;
  description: FormControl;
  fileName: string;
  picture: FormData;
  picture2: any;
  isUploading = false;
  url = this.userService.baseApiUrl + "/photos/upload";

  constructor(private http: Http, private userService: UserService, private router: Router) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.pictureName = new FormControl('', Validators.required);
    this.description = new FormControl('');
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      pictureName: this.pictureName,
      description: this.description
    });
  }

  public FileChanged(event)
  {
    this.imageSelected = false;
    const fileList: FileList = event.target.files;

    if(fileList && fileList.length > 0)
    {
      this.picture = new FormData();
      this.picture.append("picture", fileList[0]);
      this.picture.append("title", encodeURI(this.pictureName.value));
      this.picture.append("token", this.userService.token);
      this.picture.append("userId", this.userService.id);
      this.picture.append("description", encodeURI(this.description.value));

      // picture validation
      const type = this.picture.get("picture")["type"];
      const size = this.picture.get("picture")["size"];
      if(type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png" && type !== "image/gif")
      {
        this.imageError = "Palaikomi paveikslėlių tipai yra jpg, png ir gif";
        this.picture = null;
        this.fileName = "";
        return;
      }
      if(size > 5242880)
      {
        this.imageError = "Nuotraukos dydis turi būti mažesnis nei 5Mb!";
        this.picture = null;
        this.fileName = "";
        return;
      }

      // show selected image in browser
      const imageFile: any = document.querySelector("#imageFile");
      imageFile.file = fileList[0];

      const reader = new FileReader();
      reader.onload = (function(tempImg)
      {
        return function(e)
        {
          tempImg.src = e.target.result;
        };
      })(imageFile);

      reader.readAsDataURL(fileList[0]);
      this.fileName = fileList[0].name;

      this.imageSelected = true;
      this.imageError = "";
    }
  }

  public UploadPhoto()
  {
    this.errorMessage = "";

    if(!this.imageSelected)
    {
      this.imageError = "Pasirinkite nuotrauką!";
      return;
    }

    if(this.form.valid)
    {
      this.isUploading = true;
      this.http.post
      (
        this.url,
        this.picture
      ).subscribe
      (
        data =>
        {
          this.isUploading = false;
          const response = data.json();
          if(response.message == "OK")
          {
            // TODO - get token from server //
            this.userService.token = response.token;
            this.userService.SetUserLoggedIn();
            this.router.navigate([""]);
          }
          else
          {
            this.errorMessage = "Klaida susisiekant su serveriu, bandykite dar kartą.";
          }
        },
        error =>
        {
          this.isUploading = false;
          this.errorMessage = error.message;
        }
      );

    }
  }

}
