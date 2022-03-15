import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Category } from 'src/models/category';
import { GameToCreateData } from 'src/models/GameToCreateData';
import { Player } from 'src/models/Player';
import { CategoryService } from 'src/services/Category/category.service';
import { GameService } from 'src/services/Game-service/game-service.service';
import { UsersService } from 'src/services/User/users.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  game? :GameToCreateData = undefined;
  categoriesNumbers = [0, 1, 2, 3, 4];
  categories: Category[] = [];
  availableCategories: Category[] = [];
  selectedCategories: Category[] = [];
  idOfCreatedGame :Guid = Guid.createEmpty();
  usersNumbers = [0, 1, 2]
  users: Player[] = [];
  availableUsers: Player[];
  selectedUsers: Player[];

  constructor(private gameService: GameService, private categoriesService: CategoryService, private playerService: UsersService) {
    this.availableUsers = new Array<Player>();
    this.selectedCategories = [
      { id: Guid.create(), name: "unknown"},
      { id: Guid.create(), name: "unknown"},
      { id: Guid.create(), name: "unknown"},
      { id: Guid.create(), name: "unknown"},
      { id: Guid.create(), name: "unknown"}
    ];
    this.selectedUsers = [
      { id: Guid.create(), name: "unknown", sumOfPoints: 0},
      { id: Guid.create(), name: "unknown", sumOfPoints: 0},
      { id: Guid.create(), name: "unknown", sumOfPoints: 0}
    ];
   }

  ngOnInit(): void {
    this.loadCategories();
    this.loadPlayers();
  }

  cancelChoices(){
    console.log("Send this component again(clear all)")
  }
  
  loadCategories(){
    this.categoriesService.getAllCategories().subscribe((categories : Category[]) => {
      categories.forEach((category) => {
        this.categories.push(category);
        this.availableCategories.push(category);
      })
    });
  }

  loadPlayers(){
    this.playerService.getAllUsers().subscribe((users: Player[]) => {
      users.forEach((user) => {
        this.users.push(user);
        this.availableUsers.push(user);
      }) 
    });
  }

  startGame(){
    console.log("Start game")
    this.game = { players: this.selectedUsers, categories: this.selectedCategories };
    this.gameService.postGame(this.game).subscribe((id:Guid)=>{ 
      this.idOfCreatedGame = id;
      window.location.href = '/va-banque/admin-main/play/' + id;
    });
  }

  selectNewCategory(categoryDropdown: [Category, number]){
    var category = categoryDropdown[0];
    var number = categoryDropdown[1];

    if(number > -1 && number < 5){
      this.selectedCategories.splice(number, 1, category);
    }

    this.refreshAvailableCategories(); 
  }

  refreshAvailableCategories(){
    this.availableCategories = [];
    this.categories.forEach(val => this.availableCategories.push(Object.assign({}, val)));
    this.selectedCategories.forEach(selectedCategory => {      
      if(selectedCategory.name !== "unknown"){
          this.removeFromAvailableCategories(selectedCategory);
      }
    });
  }

  removeFromAvailableCategories(category: Category){
    const index = this.availableCategories.indexOf(category, 0);
    if (index > -1) {
       this.availableCategories.splice(index, 1);
    }
  }

  selectNewUser(userDropdown: [Player, number]){
    var user = userDropdown[0];
    var number = userDropdown[1];
    if(number > -1 && number < 3){
      this.selectedUsers.splice(number, 1, user);
    }
    this.refreshAvailableUsers();
  }

  refreshAvailableUsers(){
    this.availableUsers = [];
    this.users.forEach(val => this.availableUsers.push(Object.assign({}, val)));
    this.selectedUsers.forEach(selectedUser => {      
      if(selectedUser.name !== "unknown"){
          this.removeFromAvailableUsers(selectedUser);
      }
    });
  }

  removeFromAvailableUsers(user: Player){
    const index = this.availableUsers.indexOf(user, 0);
    if (index > -1) {
       this.availableUsers.splice(index, 1);
    }
  }
}
