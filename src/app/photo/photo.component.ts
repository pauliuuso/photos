import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  public photoId: string;
  public url = this.userService.baseApiUrl + "/photos/getone";
  public photo: Array<string> = new Array<string>();
  public errorMessage: string;

  constructor(private route: ActivatedRoute, private http: Http, private userService: UserService) { }

  ngOnInit() 
  {
    this.route.params.subscribe(params =>
    {
      this.photoId = params["id"];
    });

    this.http.post(this.url, {"id": this.photoId})
    .subscribe
    (
      data =>
      {
        this.photo = data.json();
      },
      error =>
      {
        this.errorMessage = error.message;
      }
    )
  }

}
