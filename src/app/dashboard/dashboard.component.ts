import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private url = this.userService.baseApiUrl + "/photos/getall";
  public errorMessage;
  public photos;

  constructor(private userService: UserService, private http: Http) 
  {
    this.photos = new Array<Object>();
  }

  ngOnInit() 
  {
    this.http.get(this.url)
    .subscribe
    (
      data => 
      {
        this.photos = data.json()["photos"];
      },
      error =>
      {
        this.errorMessage = error.message;
      }
    )

    // this.GetPhotos().subscribe( data =>
    // {
    //   this.photos = data;
    // });
  }

  GetPhotos(): Observable<PhotoItem[]>
  {
    return this.http.get(this.url)
    .map(res => 
    {

      return res.json().results.map(item =>
      {
        return new PhotoItem
        (
          item.message
        );
      });
    });
  }

}

class PhotoItem
{
  constructor
  (
    public message: string
  ){}
}
