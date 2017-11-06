import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService
{
  public getOnePhotoUrl = this.userService.baseApiUrl + "/photos/getone";
  public getAllPhotosUrl = this.userService.baseApiUrl + "/photos/getall";
  public deleteUrl = this.userService.baseApiUrl + "/photos/delete";

  constructor(private http: Http, private userService: UserService) {}

  public GetPhoto(photoId: string): Observable<IPhoto>
  {
    return this.http.post(this.getOnePhotoUrl, {"id": photoId})
    .map(data => data.json() as IPhoto);
  }

  public DeletePhoto(photoId: string)
  {
    return this.http.post(this.deleteUrl, {"id": photoId});
  }

  public GetPhotos(userId?: string)
  {
    // TODO change to post
    return this.http.get(this.getAllPhotosUrl)
    .map(data => data.json().photos as IPhoto[]);
  }

}

export interface IPhoto
{
  id: string;
  title: string;
  url: string;
  owner: string;
  ownerId: string;
  description: string;
}
