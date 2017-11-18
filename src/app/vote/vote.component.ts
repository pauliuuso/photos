import { Component, OnInit } from '@angular/core';
import { VoteService, IVoted } from '../services/vote.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit
{

  public photoId: string;
  public voted: IVoted = { voted: "true", message: "", token: "" };
  public errorMessage: string;
  public voteMessage: string;
  public votingInProgress = false;

  buttons: any[] =
  [
    { "value": -5 , "class": "vote-button-minus"},
    { "value": -4 , "class": "vote-button-minus"},
    { "value": -3 , "class": "vote-button-minus"},
    { "value": -2 , "class": "vote-button-minus"},
    { "value": -1 , "class": "vote-button-minus"},
    { "value": 0 , "class": "vote-button-neutral"},
    { "value": 1 , "class": "vote-button-plus"},
    { "value": 2 , "class": "vote-button-plus"},
    { "value": 3 , "class": "vote-button-plus"},
    { "value": 4 , "class": "vote-button-plus"},
    { "value": 5 , "class": "vote-button-plus"}
  ];

  constructor(private voteService: VoteService, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit()
  {

    this.route.params.subscribe(params =>
    {
      this.photoId = params["id"];
    });

    this.voteService.CheckIfVoted(this.photoId, this.userService.id)
    .subscribe
    (
      data =>
      {
        this.voted = data;
        if (data.voted === "true")
        {
          this.voteMessage = "Ačiū už balsą!";
        }
      },
      error => this.errorMessage = error.message
    );

  }

  public Vote(value: number)
  {
    this.votingInProgress = true;
    this.errorMessage = "";
    this.voteMessage = "";

    this.voteService.SendVote(this.photoId, value, this.userService.id, this.userService.token)
    .subscribe
    (
      data =>
      {
        this.votingInProgress = false;
        this.voted = data;
        this.userService.token = data.token;
        this.userService.SetUserLoggedIn();
        if(data.message === "OK")
        {
          this.voteMessage = "Ačiū už balsą!";
        }
        else
        {
          this.errorMessage = "Balsuoti nepavyko, bandykite dar kartą."
        }

      },
      error =>
      {
        this.votingInProgress = false;
        this.errorMessage = error.message
      }
    );
  }

}
