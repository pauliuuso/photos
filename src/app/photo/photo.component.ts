import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { PhotoService, IPhoto } from '../services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  public loading = true;
  public showDelete = false;
  public photoId: string;
  public photo: IPhoto = { id: "", title: "", url: "", owner: "", ownerId: "", description: "" };
  public errorMessage: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private photoService: PhotoService) { }

  ngOnInit()
  {
    this.route.params.subscribe(params =>
    {
      this.photoId = params["id"];
    });

    this.photoService.GetPhoto(this.photoId)
    .subscribe
    (
      data => { this.photo = data; this.CheckShowDelete(); },
      error => this.errorMessage = error.message
    );

  }

  public CheckShowDelete()
  {
    if(this.photo.ownerId === this.userService.id || this.userService.role === "admin")
    {
      this.showDelete = true;
    }
  }

  public decode(text: string)
  {
    return decodeURI(text);
  }

  public ImageLoaded()
  {
    this.loading = false;
  }

  public DeletePhoto()
  {
    this.photoService.DeletePhoto(this.photoId)
    .subscribe
    (
      data =>
      {
        if(data.json().message === "OK")
        {
          console.log("deleted");
        }
      },
      error => this.errorMessage = error.message
    );
  }

}
