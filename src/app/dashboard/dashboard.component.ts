import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { PhotoService, IPhoto } from '../services/photo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private url = this.userService.baseApiUrl + "/photos/getall";
  public errorMessage;
  public photos: IPhoto[];

  constructor(private userService: UserService, private photoService: PhotoService) {}

  ngOnInit()
  {
    this.photoService.GetPhotos("")
    .subscribe
    (
      data => { this.photos = data; },
      error => { this.errorMessage = error.message; }
    );
  }
}
