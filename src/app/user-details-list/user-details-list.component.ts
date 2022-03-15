import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Player } from 'src/models/Player';
import { UsersService } from 'src/services/User/users.service';

@Component({
  selector: 'app-user-details-list',
  templateUrl: './user-details-list.component.html',
  styleUrls: ['./user-details-list.component.scss']
})
export class UserDetailsListComponent implements OnInit {

  allUsers: Player[] = [];
  isLoadingResults: boolean = true;
  resultsLength: Number = 0;
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.GetUsers();
  }
  GetUsers(){
    this.usersService.getAllUsers().subscribe((users)=>{
      this.allUsers = users;
      this.isLoadingResults = false;
      this.resultsLength = this.allUsers.length;
      console.log(this.allUsers);
    })
  }
  removeUser(id : Guid){
    this.usersService.remove(id).subscribe(()=>{
      this.GetUsers();
    })
  }

}
