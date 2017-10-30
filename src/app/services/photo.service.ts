import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';

@Injectable()
export class PhotoService
{
  public url = this.userService.baseApiUrl + "/photos/getone";
  public deleteUrl = this.userService.baseApiUrl + "/photos/delete";

  constructor(private http: Http, private userService: UserService) {}

  public GetPhoto(photoId: string): Observable<IPhoto>
  {
    return this.http.post(this.url, {"id": photoId})
    .map(data => data.json() as IPhoto);
  }

  public DeletePhoto(photoId: string)
  {
    return this.http.post(this.deleteUrl, {"id": photoId});
  }

}

export interface IPhoto
{
  id: string;
  title: string;
  url: string;
  owner: string;
  ownerId: string;
}
