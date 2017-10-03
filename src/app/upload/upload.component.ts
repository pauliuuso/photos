import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit
{

  form:FormGroup;
  pictureName:FormControl;

  constructor() { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();
  }

  public CreateFormControls()
  {
    this.pictureName = new FormControl('', Validators.required);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      pictureName: this.pictureName
    });
  }

  public UploadPhoto()
  {
    if(this.form.valid)
    {
      alert("upload");
    }
  }

}
