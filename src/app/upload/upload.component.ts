import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy
{
  errorMessage:string;
  form:FormGroup;
  pictureName:FormControl;
  fileInput:Object;
  fileName:string;
  picture:FormData;
  picture2:any;
  isUploading = false;
  url = this.userService.baseApiUrl + "/photos/upload";

  constructor(private http: Http, private userService: UserService, private router: Router) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();


    this.fileInput =
    {
      errors:
      {
        required: false
      }
    };
  }

  ngOnDestroy()
  {
  }

  public CreateFormControls()
  {
    this.pictureName = new FormControl('', Validators.required);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      pictureName: this.pictureName,
    });
  }

  public FileChanged(event)
  {
    const fileList: FileList = event.target.files;

    if(fileList && fileList.length > 0)
    {
      this.picture = new FormData();
      this.picture.append("picture", fileList[0]);
      this.picture.append("title", this.pictureName.value);
      this.picture.append("token", this.userService.token);
      this.picture.append("userId", this.userService.id);

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

    }

  }

  public UploadPhoto()
  {
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
          const response = data.json();
          if(response.message == "OK")
          {
            this.isUploading = false;
            this.router.navigate([""]);
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
