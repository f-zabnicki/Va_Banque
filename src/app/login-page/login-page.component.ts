import { Route } from '@angular/compiler/src/core';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { Credentials } from 'src/models/Credentials';
import { Player } from 'src/models/Player';
import { UsersService } from 'src/services/users.service';
import { PlayerGameViewComponent } from '../player-game-view/player-game-view.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  cr : Credentials = {username: "", password: ""};
  errorMode = false;
  loggedUser?: Player;
  constructor(private http : UsersService, private router:Router) { }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.form.value);
    this.http.login(this.form.value).subscribe((player) =>{
      console.log(player);
      this.loggedUser = player;
      // if(player.role == Role.ADMIN)
      this.router.navigate(['/va-banque/admin-main']);
      // if(player.role == Role.PLAYER)
      // this.router.navigate(['/'])
    },
    error=>{
      this.errorMode = true;
    })
  }
}
