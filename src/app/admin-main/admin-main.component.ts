import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/Player';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  constructor(private UsersService: UsersService, private CategoryService: CategoryService) { }
  mode="";
  users!: Player[];
  categories!: Category[];
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCategories();
    this.updateViewAfterAddingUser();
    this.updateViewAfterAddingCategory();
  }
  private getAllUsers() {
    this.UsersService.getAllUsers().subscribe((users) => {
      this.users = users;
     
    });
  }
  private getAllCategories() {
    this.CategoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;

    });
  }
  changeCategoryMode(){
    this.mode = "Category";
  }
  changeUserMode(){
    this.mode = "User";
  }
  changeMode() {
    this.mode = "";
  }
  private updateViewAfterAddingUser() {
    //remember to unsubscrie
    this.UsersService.updateListOfUsers$.subscribe((user: Player) => {
      this.users.push(user)
    })
  }
  private updateViewAfterAddingCategory() {
    //remember to unsubscrie
    this.CategoryService.updateListOfCategories$.subscribe((category: Category) => {
      this.categories.push(category)
    })
  }
  public removeUser(id: Guid){
    this.UsersService.remove(id).subscribe(() => {
      this.users = this.users.filter(b => b.id !== id)
    })
  }
  public removeCategory(id: Guid){
    this.CategoryService.remove(id).subscribe(() => {
      this.categories = this.categories.filter(b => b.id !== id)
    })
  }
}
