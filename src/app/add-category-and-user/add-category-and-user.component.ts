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

  constructor(private CategoryService: CategoryService) { }
  unsubscribe$: Subject<void> = new Subject<void>();
  @Output() info = new EventEmitter<any>();
  categories?: Category[];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }
  onSubmit() {
      this.CategoryService.addCategory(this.form.value).subscribe((category) => {
        this.CategoryService.getAllCategories();
        this.CategoryService.updateView(category);
        this.formListener()
      });
      this.info.emit(false);
    }

  formListener() {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        console.log(value);
      });
  }
}
