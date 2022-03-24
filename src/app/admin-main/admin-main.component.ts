import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/Player';
import { Category } from '../../models/category';
import { Guid } from 'guid-typescript';
import { GameToCreateData } from 'src/models/GameToCreateData';
import { Question } from 'src/models/Question';
import { QuestionTest } from 'src/models/questionTest';
import { QuestionsService } from 'src/services/Questions/questions.service';
import { GameService } from 'src/services/Game-service/game-service.service';
import { UsersService } from 'src/services/User/users.service';
import { CategoryService } from 'src/services/Category/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  currentTab:number = 0;
  addQuestionFlag: boolean = false;
  questions: Question[] = [];
  tempQuestion!: QuestionTest[];
  temp!:Category;
  ascending = true;
  sortingColumn = 1;
  game? :GameToCreateData = undefined;
  categoriesNumbers = [0, 1, 2, 3, 4];
  availableCategories: Category[] = [];
  selectedCategories: Category[] = [];
  idOfCreatedGame :Guid = Guid.createEmpty();
  usersNumbers = [0, 1, 2]
  availableUsers: Player[];
  selectedUsers: Player[];
  mode="";
  users: Player[] = [];
  categories: Category[] = [];
  displayedColumns: string[] = [];
  constructor( private route: ActivatedRoute, private gameService: GameService, private CategoryService: CategoryService, private playerService: UsersService, private questionsService: QuestionsService) {
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
    this.questionListener();
    this.questionsListListener();
    this.updateViewAfterAddingUser();
    this.updateViewAfterAddingCategory();
    this.loadCategories();
    this.loadPlayers();
    this.displayedColumns = ['id', 'name'];
  }
  loadCategories(){
    this.CategoryService.getAllCategories().subscribe((categories : Category[]) => {
      categories.forEach((category) => {
        this.categories.push(category);
        this.availableCategories.push(category);
      })
    });
  }
  questionListener(): void{
    console.log(this.route.params);
    this.route.params.subscribe( params => this.currentTab = params.currentTab);
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
    this.playerService.updateListOfUsers$.subscribe((user: Player) => {
      this.users.push(user)
    })
  }

  infoFromCategoryChild(info: boolean){
    this.addQuestionFlag = info;
  }

  private updateViewAfterAddingCategory() {
    //remember to unsubscrie
    this.CategoryService.updateListOfCategories$.subscribe((category: Category) => {
      this.categories.push(category)
    })
  }
  public removeUser(id: Guid){
    this.playerService.remove(id).subscribe(() => {
      this.users = this.users.filter(b => b.id !== id)
    })
  }
  public removeCategory(id: Guid){
    this.CategoryService.remove(id).subscribe(() => {
      this.categories = this.categories.filter(b => b.id !== id)
    })
  }
  
  cancelChoices(){
    
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

  ShowNewCategoryPanel(){
    this.addQuestionFlag = !this.addQuestionFlag;
    this.updateViewAfterAddingCategory();
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
  private questionsListListener() {
    this.questionsService.getQuestions().subscribe((questionsFromApi: QuestionTest[]) => {
      this.tempQuestion = questionsFromApi;
      this.CategoryService.getAllCategories().subscribe((cat: Category[])=>{
        this.tempQuestion.map((question)=>{
          this.temp = cat.find(({id})=> id === question.categoryId) as Category;
          this.questions.push({id: question.id, content: question.content, answer: question.answer, points: question.points, category: this.temp});
        });
      })
    },
    (error) => {
      console.error(error);
    });
  }

  public deleteQuestion(questionId: Guid){
    console.log(questionId);
    console.log(this.questions);
    this.questionsService.deleteQuestion(questionId).subscribe(() => {
      this.questions = this.questions.filter(q => q.id !== questionId)
    })
  }

  public sortQuestions(column: number){

    if(column === this.sortingColumn){
      this.ascending = !this.ascending;
    }

    this.sortingColumn = column;

    if(this.ascending){
      this.sortAscending(column)
    }else{
      this.sortDescending(column);
    }    
  }

  private sortAscending(column: number){
    switch(column){
      case 1:
        this.questions.sort((a, b) => (a.id < b.id ? -1 : 1));
        break;
      case 2:
        this.questions.sort((a, b) => (a.content.localeCompare(b.content)));
        break;
      case 3:
        this.questions.sort((a, b) => (a.answer.localeCompare(b.answer)));
        break;
      case 4:
        this.questions.sort((a, b) => (a.category.name.localeCompare(b.category.name)));
        break;
      case 5:
        this.questions.sort((a, b) => (a.points < b.points ? -1 : 1));
        break;
      default:
        break;
    }
  }

  private sortDescending(column: number){
    switch(column){
      case 1:
        this.questions.sort((a, b) => (a.id > b.id ? -1 : 1));
        break;
      case 2:
        this.questions.sort((a, b) => (b.content.localeCompare(a.content)));
        break;
      case 3:
        this.questions.sort((a, b) => (b.answer.localeCompare(a.answer)));
        break;
      case 4:
        this.questions.sort((a, b) => (b.category.name.localeCompare(a.category.name)));
        break;
      case 5:
        this.questions.sort((a, b) => (a.points > b.points ? -1 : 1));
        break;
      default:
        break;
    }
  }
}
