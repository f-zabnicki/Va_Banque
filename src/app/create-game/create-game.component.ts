import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Category } from 'src/models/category';
import { Game } from 'src/models/Game';
import { GameToCreateData } from 'src/models/GameToCreateData';
import { Player } from 'src/models/Player';
import { CategoryService } from 'src/services/category.service';
import { GameService } from 'src/services/game-service.service';
import { UsersService } from 'src/services/users.service';
import { getTsBuildInfoEmitOutputFilePath } from 'typescript';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  game? :GameToCreateData = undefined;
  categoriesNumbers = [0, 1, 2, 3, 4];
  categories: Category[] = [];
  
  /*[
    { id: Guid.create(), name: "WŁADCY POLSKI"},
    { id: Guid.create(), name: "REKORDY GEOGRAFICZNE"},
    { id: Guid.create(), name: "REKORDY ŚWIATA ZWIERZĄT"},
    { id: Guid.create(), name: "GWIAZDY I PLANETY"},
    { id: Guid.create(), name: "FILMY"},
    { id: Guid.create(), name: "POLSCY MEDALIŚCI OLIMPIJSCY"}
  ];
  */

  availableCategories: Category[] = [];
  selectedCategories: Category[] = [];

  idOfCreatedGame :Guid = Guid.createEmpty();

  usersNumbers = [0, 1, 2]
  users: Player[] = [];
  /* = [
    { id: Guid.create(), name: "Patryk" ,sumOfPoints: 100},
    { id: Guid.create(), name: "Maja", sumOfPoints: 100},
    { id: Guid.create(), name: "Filip", sumOfPoints: 100},
    { id: Guid.create(), name: "Marcin", sumOfPoints: 100}
  ];
  */
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
    //this.categories.forEach(val => this.availableCategories.push(Object.assign({}, val)));
    //this.users.forEach(val => this.availableUsers.push(Object.assign({}, val)));
    //console.log(this.categories);
    //this.availableCategories = [...this.categories];
    /*
    this.categories.forEach((category) => {
      this.availableCategories.push(category);
    });
    console.log(this.availableCategories);
    this.availableUsers = [...this.users];
    */
  }

  cancelChoices(){
    console.log("Send this component again(clear all)")
  }
  
  loadCategories(){
    this.categoriesService.getAllCategories().subscribe((categories : Category[]) => {
      //this.categories = [...categories];
      categories.forEach((category) => {
        this.categories.push(category);
        this.availableCategories.push(category);
      })
    });
  }

  loadPlayers(){
    this.playerService.getAllUsers().subscribe((users: Player[]) => {
      //this.users = [...users];    
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
      //[routerLink]="['/va-banque/admin-main/play']"
    });
    //[routerLink]="['./adin-main', gameId.id]"
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
    //this.availableCategories = [...this.categories];
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
    //this.availableUsers = [...this.users];

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
