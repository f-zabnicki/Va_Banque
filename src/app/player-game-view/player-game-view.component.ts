import { CategoryService } from 'src/services/category.service';
import { Component, OnInit } from '@angular/core';
import { QuestionInGame } from 'src/models/QuestionInGame';
import { PlayerInGame } from 'src/models/PlayerInGame';
import { GameService } from 'src/services/game-service.service';
import { Game } from 'src/models/Game';
import { Guid } from 'guid-typescript';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-player-game-view',
  templateUrl: './player-game-view.component.html',
  styleUrls: ['./player-game-view.component.scss'],
})
export class PlayerGameViewComponent implements OnInit {
  constructor(
    private httpGame: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  allCategories: Category[] = [];
  array: QuestionInGame[] = [];
  cat: number[] = [1, 2, 3, 4, 5];
  users: PlayerInGame[] = [];
  isGame: boolean = true;
  gameid: Guid = Guid.createEmpty();
  //DODAC LISTE Z PYTANIAMI I Z USERAMI Z API
  ngOnInit(): void {
    this.questionListener();
    this.httpGame.getGame(this.gameid).subscribe((game: Game) => {
      this.isGame = game.isLive;
      this.users = game.players;
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
      /*
      for (var i = 0; i < 5; i++) {
        // this.categoryService
        //   .getCategory(this.array[i].question.categoryId)
        //   .subscribe((cat) => {
        //     this.allCategories.push(cat);
        //     console.log(cat);
        //   });
      }
      //this.allCategories.sort((a,b)=> this.sortCategories(a,b));
      */
    });
  }
  questionListener(): void {
    this.route.params.subscribe((params) => (this.gameid = params.id));
  }
  reload() {
    window.location.href = '/va-banque/player/play/' + this.gameid;
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
}