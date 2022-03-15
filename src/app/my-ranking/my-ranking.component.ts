import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { UsersService } from 'src/services/User/users.service';

@Component({
  selector: 'app-my-ranking',
  templateUrl: './my-ranking.component.html',
  styleUrls: ['./my-ranking.component.scss']
})
export class MyRankingComponent implements OnInit {

  usersRanking: number[]=[];
  isLoadingResults: boolean = true;
  resultsLength: Number = 0;
  loggedUserId: string | null = "";
  displayedColumns: string[] = ['points' ];

  constructor(private userService : UsersService) { }

  ngOnInit(): void {
    this.getMyHighestScores();
  }

  getMyHighestScores(){
    this.loggedUserId = localStorage.getItem('id');
    if(this.loggedUserId != null){
      this.userService.getMyHighestScores(Guid.parse(this.loggedUserId)).subscribe((scores)=>{
        this.usersRanking = scores;
        console.log(this.usersRanking);
      })
    }

  }

}
