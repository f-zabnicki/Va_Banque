import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnDestroy{

  createdMode = false;
  errorMode = false;
  subscription = new Subscription;
  constructor( private usersService : UsersService, private router : Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onSubmit(): void {
    console.log(this.form.value);
    const sub = this.usersService.addUser(this.form.value).subscribe((u)=>{
      console.log(u);
      this.createdMode = true;
      setTimeout(()=> this.router.navigate(['/login']), 1500 );
    },
    error=>{
      this.errorMode = true;
    });
    this.subscription.add(sub);
  }
}
