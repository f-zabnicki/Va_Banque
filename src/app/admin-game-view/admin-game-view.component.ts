import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from 'src/models/Game';
import { QuestionInGame } from 'src/models/QuestionInGame';
import { PlayerInGame } from 'src/models/PlayerInGame';
import { Guid } from 'guid-typescript';
import { QuestionStatus } from 'src/models/QestionStatus';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/models/category';
import { GameService } from 'src/services/Game-service/game-service.service';
import { PlayerInGameService } from 'src/services/Player-in-game/player-in-game.service';
import { CategoryService } from 'src/services/Category/category.service';
import { QuestionInGameService } from 'src/services/Question-in-game/question-in-game.service';
import { SignalRService } from 'src/services/SignalR/signal-r.service';

@Component({
  selector: 'app-admin-game-view',
  templateUrl: './admin-game-view.component.html',
  styleUrls: ['./admin-game-view.component.scss'],
})
export class AdminGameViewComponent implements OnInit {
  array: QuestionInGame[] = [];
  cat: number[] = [1, 2, 3, 4, 5];
  allCategories?: Category[] = [];
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
    private httpGame: GameService,
    private httpPlayer: PlayerInGameService,
    private categoryService: CategoryService,
    private questionInGameService: QuestionInGameService,
    private route: ActivatedRoute,
    private signalRService: SignalRService
  ) {
    this.selectedUser = undefined;
  }

  ngOnInit(): void {
    this.questionListener();
    this.signalRService.start();
    this.signalRService.startConnection("informacje");
    this.httpGame.getGame(this.gameid).subscribe((game: Game) => {
      console.log(game);
      this.users = game.players;
      this.activeUsers = [...this.users];
      this.array = game.questions;
      this.array.sort((a, b) => this.sortArray(a, b));
      this.users.sort((a, b) => (a.points > b.points ? -1 : 1));

      this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
        for (var i = 0; i < 5; i++) {
          var category = categories.find((c) => c.id == this.array[i].question.categoryId);
          console.log(category);
          this.allCategories?.push(category!);
        }
      });
      console.log(this.allCategories);
      console.log(this.array);
    });
  }

  updateSignalR(){
    this.signalRService.updateGame(this.users, this.array);
  }

  sortArray(ob1: QuestionInGame, ob2: QuestionInGame) {
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
  ShowQuestion(content: any, question: QuestionInGame) {
    this.currentQuestion = question;
    this.modalService.open(content, { centered: true });
    console.log(this.modalService);
    console.log(question);
  }

  SelectUser(user: PlayerInGame) {
    this.selectedUser = user;
  }

  RemovePoints(question: QuestionInGame) {
    console.log(this.selectedUser);
    this.httpPlayer
      .putPlayerInGame(this.selectedUser!.id, -question.question.points)
      .subscribe(() => {
        this.selectedUser!.points -= question!.question.points;
        this.removeFromActiveUsers(this.selectedUser!);
        this.selectedUser = undefined;
        this.users.sort((a, b) => (a.points > b.points ? -1 : 1));
        this.updateSignalR();
      });
  }
  endGame() {
    console.log(this.gameid);
    this.httpGame.finishGame(this.gameid).subscribe(() => {
      window.location.href = '/va-banque/admin-main/';
    });
  }
  AddPoints(question: QuestionInGame) {
    this.httpPlayer
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
          this.users.sort((a, b) => (a.points > b.points ? -1 : 1));
          this.updateSignalR();
          });
      });
  }
  QuestionFailed(question: QuestionInGame) {
    console.log(question);
    console.log(question.id);
    this.questionInGameService
      .putQuestionInGame(question.id, false)
      .subscribe(() => {
        this.activeUsers = [...this.users];
        question.status = QuestionStatus.RED;
        this.selectedUser = undefined;
        this.updateSignalR();
      });
  }

  removeFromActiveUsers(user: PlayerInGame) {
    const index = this.activeUsers.indexOf(user, 0);
    if (index > -1) {
      this.activeUsers.splice(index, 1);
    }
  }
}
