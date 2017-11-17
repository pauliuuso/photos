import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { UserService } from '../services/user.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Injectable()
export class VoteService
{
  public checkUrl = this.userService.baseApiUrl + "/photos/checkvoted";
  public voteUrl = this.userService.baseApiUrl + "/photos/vote";
  public getVotesUrl = this.userService.baseApiUrl + "/photos/getvotes";
  public getVoteSumUrl = this.userService.baseApiUrl + "/photos/getvotesum";

  constructor(private http: Http, private userService: UserService) {}

  public CheckIfVoted(photoId: string, userId: string): Observable<IVoted>
  {
    return this.http.post(this.checkUrl, {"photoId": photoId, "userId": userId})
    .map(data => data.json() as IVoted);
  }

  public SendVote(photoId: string, value: number, userId: string, token: string): Observable<IVoted>
  {
    return this.http.post(this.voteUrl, {"photoId": photoId, "userId": userId, "value": value, "token": token})
    .map( data => data.json() as IVoted );
  }

  public GetVotes(photoId: string): Observable<IVote[]>
  {
    return Observable.timer(0, 2000)
    .flatMapTo(this.http.post(this.getVotesUrl, { "photoId": photoId })) 
    .map( data => data.json().votes as IVote[]);
  }

  public GetVoteSum(photoId: string): Observable<IVoteSum>
  {
    return Observable.timer(0, 2000)
    .flatMapTo(this.http.post(this.getVoteSumUrl, { "photoId": photoId }))
    .map( data => data.json() as IVoteSum);
  }

}

export interface IVoted
{
  message: string;
  voted: string;
  token: string;
}

export interface IVote
{
  user: string;
  userId: string;
  value: string;
}

export interface IVoteSum
{
  message: string;
  sum: string;
}
