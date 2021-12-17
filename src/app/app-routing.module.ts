import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { RankingComponent } from './ranking/ranking.component';
import { PlayerGameViewComponent } from './player-game-view/player-game-view.component';
import { AdminQuestionsListComponent } from './admin-questions-list/admin-questions-list.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGameViewComponent } from './admin-game-view/admin-game-view.component';
import { WhoYouAreComponent } from './who-you-are/who-you-are.component';

const routes: Routes = [
  {path: "va-banque/admin-main/new", component: AddQuestionsComponent },
  {path: "va-banque/admin-main", component: AdminMainComponent },
  {path: 'va-banque/admin-main/questions/edit/:id', component: EditQuestionsComponent },
  {path: "va-banque/admin-main/questions", component: AdminQuestionsListComponent},
  {path: "va-banque/admin-main/game", component: CreateGameComponent  },
  {path: "va-banque/admin-main/play/:id", component: AdminGameViewComponent },
  {path: "va-banque/player/play/:id", component: PlayerGameViewComponent },
  {path: "va-banque/ranking", component: RankingComponent },
  { path: "", component: WhoYouAreComponent, pathMatch: "full" },
  { path: "**", component: WhoYouAreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
