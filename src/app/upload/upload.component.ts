import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';
import { NgProgressService } from 'ngx-progressbar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit
{
  errorMessage:string;
  form:FormGroup;
  pictureName:FormControl;
  fileInput:Object;
  fileName:string;
  picture:any;
  url = this.userService.baseApiUrl + "/photo/upload";

  constructor(private http: Http, private userService: UserService, public progressService: NgProgressService) { }

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
      this.picture = fileList[0];

      const imageFile: any = document.querySelector("#imageFile");
      imageFile.file = this.picture;

      const reader = new FileReader();
      reader.onload = (function(tempImg)
      {
        return function(e)
        {
          tempImg.src = e.target.result;
        };
      })(imageFile);

      reader.readAsDataURL(this.picture);
      this.fileName = this.picture.name;

    }

  }

  public UploadPhoto()
  {
    if(this.form.valid)
    {
      alert("upload");
      const url = this.userService.baseApiUrl + "/photo/upload";

      this.progressService.start();
      this.http.post
      (
        this.url,
        { name: this.pictureName.value, picture: this.picture }
      ).subscribe
      (
        data =>
        {
          const response = data.json();
          this.progressService.done();
        },
        error =>
        {
          this.errorMessage = error.message;
        }
      );

    }
  }

}
