import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Category } from 'src/models/category';
import { GameToCreateData } from 'src/models/GameToCreateData';
import { Player } from 'src/models/Player';
import { CategoryService } from 'src/services/category.service';
import { GameService } from 'src/services/game-service.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  game?: GameToCreateData = undefined;
  categoriesNumbers = [0, 1, 2, 3, 4];
  availableCategories: Category[] = [];
  selectedCategories: Category[] = [];
  idOfCreatedGame: Guid = Guid.createEmpty();
  usersNumbers = [0, 1, 2]
  availableUsers: Player[] =[];
  selectedUsers: Player[] = [];
  users: Player[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name'];
  
  constructor(private gameService: GameService, private CategoryService: CategoryService, private playerService: UsersService) {
  }
  ngOnInit(): void {
    this.initializeDropDownValues();
    this.loadCategories();
    this.loadPlayers();
  }

  initializeDropDownValues(){
    this.selectedCategories = [
      { id: Guid.create(), name: "unknown" },
      { id: Guid.create(), name: "unknown" },
      { id: Guid.create(), name: "unknown" },
      { id: Guid.create(), name: "unknown" },
      { id: Guid.create(), name: "unknown" }
    ];
    this.selectedUsers = [
      { id: Guid.create(), name: "unknown", sumOfPoints: 0 },
      { id: Guid.create(), name: "unknown", sumOfPoints: 0 },
      { id: Guid.create(), name: "unknown", sumOfPoints: 0 }
    ]
  }

  loadCategories() {
    this.CategoryService.getAllCategories().subscribe((categories: Category[]) => {
      categories.forEach((category) => {
        this.categories.push(category);
        this.availableCategories.push(category);
      })
    });
  }

  cancelChoices() {
    //TODO clear button
  }

  loadPlayers() {
    this.playerService.getAllUsers().subscribe((users: Player[]) => {
      users.forEach((user) => {
        this.users.push(user);
        this.availableUsers.push(user);
      })
    });
  }

  startGame() {
    console.log("Start game")
    this.game = { players: this.selectedUsers, categories: this.selectedCategories };
    this.gameService.postGame(this.game).subscribe((id: Guid) => {
      this.idOfCreatedGame = id;
      window.location.href = '/va-banque/admin-main/play/' + id;
    });
  }

  selectNewCategory(categoryDropdown: [Category, number]) {
    var category = categoryDropdown[0];
    var number = categoryDropdown[1];
    if (number > -1 && number < 5) {
      this.selectedCategories.splice(number, 1, category);
    }
  }

  selectNewUser(userDropdown: [Player, number]) {
    var user = userDropdown[0];
    var number = userDropdown[1];
    if (number > -1 && number < 3) {
      this.selectedUsers.splice(number, 1, user);
    }
  }
}
