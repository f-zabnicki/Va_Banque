import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from 'src/models/Game';
import { QuestionInGame } from 'src/models/QuestionInGame';
import { PlayerInGame } from 'src/models/PlayerInGame';
import { GameService } from 'src/services/game-service.service';
import { PlayerInGameService } from 'src/services/player-in-game.service';
import { Guid } from 'guid-typescript';
import { QuestionStatus } from 'src/models/QestionStatus';
import { QuestionInGameService } from 'src/services/question-in-game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-admin-game-view',
  templateUrl: './admin-game-view.component.html',
  styleUrls: ['./admin-game-view.component.scss'],
})
export class AdminGameViewComponent implements OnInit {

  questionsTable: QuestionInGame[] = [];
  cat: number[] = [1, 2, 3, 4, 5];
  allCategories: Category[] = [];
  categoriesNames: string[] = [];
  selectedUser?: PlayerInGame;
  showQuestion: boolean = false;
  users: PlayerInGame[] = [];
  activeUsers = [...this.users];
  currentQuestion!: QuestionInGame;
  usersInGame: PlayerInGame[] = [];
  gameid: Guid = Guid.createEmpty();

  constructor(
    private modalService: NgbModal,
    private gameService: GameService,
    private playerInGameService: PlayerInGameService,
    private categoryService: CategoryService,
    private questionInGameService: QuestionInGameService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedUser = undefined;
  }

  ngOnInit(): void {
    this.questionListener();
    this.gameService.getGame(this.gameid).subscribe((game: Game) => {
      this.initializeUsersAndQuestions(game);
      this.sortUsersPointsAndQuesions();
        this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
          for (var i = 0; i < 5; i++) {
            var category = categories.find((c) => c.id == this.questionsTable[i].question.categoryId);
            this.allCategories.push(category!);
        }
      });
    });
  }

  initializeUsersAndQuestions(game:Game){
    this.users = game.players;
    this.questionsTable = game.questions;
  }

  sortUsersPointsAndQuesions(){
    this.sortUserPoints();
    this.questionsTable.sort((a, b) => this.sortQuestionsTable(a, b));
  }

  sortUserPoints(){
    this.users.sort((a, b) => (a.points > b.points ? -1 : 1));
  }

  sortQuestionsTable(ob1: QuestionInGame, ob2: QuestionInGame) {
    if (ob1.question.points > ob2.question.points) {
      return 1;
    } else if (ob1.question.points < ob2.question.points) {
      return -1;
    }

    if (ob1.question.categoryId < ob2.question.categoryId) {
      return -1;
    } else if (ob1.question.categoryId > ob2.question.categoryId) {
      return 1;
    } else {
      return 0;
    }
  }

  questionListener(): void {
    this.route.params.subscribe((params) => (this.gameid = params.id));
  }

  showQuestionModal(content: any, question: QuestionInGame) {
    this.currentQuestion = question;
    this.modalService.open(content, { centered: true });
  }

  selectUser(user: PlayerInGame) {
    this.selectedUser = user;
  }

  removePoints(question: QuestionInGame) {
    this.playerInGameService
      .putPlayerInGame(this.selectedUser!.id, -question.question.points)
      .subscribe(() => {
        this.selectedUser!.points -= question!.question.points;
        this.removeFromActiveUsers(this.selectedUser!);
        this.selectedUser = undefined;
        this.sortUserPoints();
      });
  }

  endGame() {
    this.gameService.finishGame(this.gameid).subscribe(() => {
      this.router.navigate(['/va-banque/admin-main']);
    });
  }
  
  addPoints(question: QuestionInGame) {
    this.playerInGameService
      .putPlayerInGame(this.selectedUser!.id, question.question.points)
      .subscribe(() => {
        this.activeUsers = [...this.users];
        this.selectedUser!.points += question!.question.points;

        this.questionInGameService
          .putQuestionInGame(question.id, true)
          .subscribe(() => {
            this.activeUsers = [...this.users];
            question.status = QuestionStatus.GREEN;
            this.selectedUser = undefined;
            this.sortUserPoints();
          });
      });
  }
  questionFailed(question: QuestionInGame) {
    console.log(question);
    console.log(question.id);
    this.questionInGameService
      .putQuestionInGame(question.id, false)
      .subscribe(() => {
        this.activeUsers = [...this.users];
        question.status = QuestionStatus.RED;
        this.selectedUser = undefined;
      });
  }

  removeFromActiveUsers(user: PlayerInGame) {
    const index = this.activeUsers.indexOf(user, 0);
    if (index > -1) {
      this.activeUsers.splice(index, 1);
    }
  }
}
