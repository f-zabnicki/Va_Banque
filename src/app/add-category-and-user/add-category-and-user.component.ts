import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Player } from '../../models/Player';
import { takeUntil } from "rxjs/operators";
import { Category } from 'src/models/category';
import { UsersService } from 'src/services/User/users.service';
import { CategoryService } from 'src/services/Category/category.service';

@Component({
  selector: 'app-add-category-and-user',
  templateUrl: './add-category-and-user.component.html',
  styleUrls: ['./add-category-and-user.component.scss']
})
export class AddCategoryAndUserComponent implements OnInit {

  constructor(private UserService: UsersService, private CategoryService: CategoryService) { }
  @Input() Mode = "";
  unsubscribe$: Subject<void> = new Subject<void>();
  @Output() changeMode = new EventEmitter<any>();
  users?: Player[];
  categories?: Category[];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.Mode == "Category") {
      this.CategoryService.addCategory(this.form.value).subscribe((category) => {
        this.CategoryService.getAllCategories();
        this.CategoryService.updateView(category);
        this.formListener()
      });
      this.changeMode.emit(false);
    }
    else {
      this.UserService.addUser(this.form.value).subscribe((user) => {
        this.UserService.getAllUsers();
        this.UserService.updateView(user);
        this.formListener()
      });
      this.changeMode.emit(false);
    }
  }
  formListener() {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        console.log(value);
      });
  }
}
