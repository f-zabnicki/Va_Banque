import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Player } from 'src/models/Player';
import { UsersService } from 'src/services/users.service';
import { PlayerGameViewComponent } from '../player-game-view/player-game-view.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user?: Player;
  isPlayerlogged: boolean = false
  guid?: Guid;
  localStorageValue?: string | null;
  constructor( private userService : UsersService,  private router:Router) { }

  ngOnInit(): void {
    this.GetGuid();
    this.GetUser();
  }
  GetGuid(){
    if(localStorage.getItem('id')!=null){
      console.log(localStorage.getItem('id'));
      this.localStorageValue = localStorage.getItem('id');
      this.guid = this.localStorageValue !== null ? Guid.parse(this.localStorageValue) : undefined;
    }
  }
  GetUser(){
    this.userService.getUser(this.guid!).subscribe((user)=>{
      this.isPlayerlogged = true;
      this.user = user;
    })
  }

  Logout(){
    if(this.user != null){
      this.userService.logOut(this.user.id).subscribe(()=>{
        localStorage.clear();
        this.isPlayerlogged = false;
        this.router.navigate(['']);
      })
    }
  }
}
