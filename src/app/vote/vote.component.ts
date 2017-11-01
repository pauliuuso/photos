import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit
{
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

  constructor() { }

  ngOnInit()
  {

  }

  public Vote(value: number)
  {
    console.log(value);
  }

}
