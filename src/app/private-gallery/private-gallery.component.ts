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
  public galleryOwner: string;
  public errorMessage: string;
  public ownerId: string;

  constructor(private photoService: PhotoService, private userService: UserService, private route: ActivatedRoute) 
  {

  }

  ngOnInit()
  {
    this.route.params.subscribe(params =>
    {
      this.ownerId = params["id"];
      
      this.photoService.GetPhotos(this.ownerId)
      .subscribe
      (
        data => this.photos = data,
        error => this.errorMessage = error.message
      );
  
      this.photoService.GetGalleryOwner(this.ownerId)
      .subscribe
      (
        data => this.galleryOwner = data,
        error => this.errorMessage = error.message
      );
    });
  }

}
