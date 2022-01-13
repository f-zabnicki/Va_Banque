import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  createdMode = false;
  errorMode = false;

  constructor( private usersService : UsersService) { }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.usersService.addUser(this.form.value).subscribe((u)=>{
      console.log(u);
      this.createdMode = true;
    },
    error=>{
      this.errorMode = true;
    });
  }
}
