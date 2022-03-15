import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Player } from 'src/models/Player';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  usersRanking: Player[]=[];
  isLoadingResults: boolean = true;
  resultsLength: Number = 0;
  displayedColumns: string[] = [ 'name', 'points' ];
  
  constructor(private userServise: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userServise.getAllUsers().subscribe((users: Player[])=>{
      console.log(users);
      this.usersRanking = users;
      this.usersRanking.sort((a,b)=> a.sumOfPoints-b.sumOfPoints).reverse();
    })
  }

}
