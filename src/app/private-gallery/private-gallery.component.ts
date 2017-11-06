import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService, IPhoto } from '../services/photo.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-private-gallery',
  templateUrl: './private-gallery.component.html',
  styleUrls: ['./private-gallery.component.css']
})
export class PrivateGalleryComponent implements OnInit {

  public photos: IPhoto[];
  public errorMessage: string;

  constructor(private photoService: PhotoService, private userService: UserService) { }

  ngOnInit()
  {
    this.photoService.GetPhotos(this.userService.id)
    .subscribe
    (
      data => this.photos = data,
      error => this.errorMessage = error.message
    );
  }

}
