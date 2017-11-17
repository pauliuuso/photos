import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoteService, IVote, IVoteSum } from '../services/vote.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  public photoId: string;
  public errorMessage: string;
  public votes: IVote[] = [{value: "5", user: "Paulius", userId: "4"}];
  public id:string;
  public voteSum: string;

  constructor(private route: ActivatedRoute, private voteService: VoteService, private userService: UserService) { }

  ngOnInit()
  {
    this.id = this.userService.id;

    this.route.params.subscribe(params =>
    {
      this.photoId = params['id'];
    });

    this.voteService.GetVotes(this.photoId)
    .subscribe
    (
      data =>
      {
        this.votes = data;
      },
      error => this.errorMessage = error.message
    );

    this.voteService.GetVoteSum(this.photoId)
    .subscribe
    (
      data =>
      {
        if(data.message == "OK")
        {
          this.voteSum = data.sum;
        }
        else
        {
          this.errorMessage = "Nepavyko gauti balsų sumos";
        }
      },
      error => this.errorMessage = error.message
    );

  }

}
