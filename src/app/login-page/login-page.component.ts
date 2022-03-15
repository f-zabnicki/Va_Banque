import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { Player } from 'src/models/Player';
import { Role } from 'src/models/role';
import { UsersService } from 'src/services/User/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  errorMode = false;
  loggedUser?: Player;
  constructor(private usersService : UsersService, private router:Router) { }

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    //Implementation of logging when user was logged and his data is in local storage
    // if(localStorage.getItem('id') != null){
    //   this.usersService.
    // }
  }
  onSubmit(){
    console.log(this.form.value);
    localStorage.clear();
    this.usersService.login(this.form.value).subscribe((player) =>{
      console.log(player);
      this.usersService.isUserLoggedIn = true;
      this.loggedUser = player;
      localStorage.setItem('role', player.role);
      localStorage.setItem('id', player.id);
      localStorage.setItem('email', player.email);
      if(player.role == Role.ADMIN)
      console.log("dochodzi");
      this.router.navigate(['/va-banque/admin-main']);
      if(player.role == Role.USER)
      this.router.navigate(['/va-banque/player/play']);
    },
    error=>{
      this.errorMode = true;
    })
  }
}
