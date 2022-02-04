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
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AdminViewGuard } from 'src/guard/admin-view.guard';
import { PlayerViewGuard } from 'src/guard/player-view.guard';

const routes: Routes = [
  {path: "va-banque/admin-main/new", component: AddQuestionsComponent, canActivate:[AdminViewGuard] },
  {path: "va-banque/admin-main", component: AdminMainComponent, canActivate:[AdminViewGuard] },
  {path: 'va-banque/admin-main/questions/edit/:id', component: EditQuestionsComponent, canActivate:[AdminViewGuard] },
  {path: "va-banque/admin-main/questions", component: AdminQuestionsListComponent, canActivate:[AdminViewGuard] },
  {path: "va-banque/admin-main/game", component: CreateGameComponent, canActivate:[AdminViewGuard] },
  {path: "va-banque/admin-main/play/:id", component: AdminGameViewComponent, canActivate:[AdminViewGuard] },
  {path: "va-banque/player/play/:id", component: PlayerGameViewComponent, canActivate:[PlayerViewGuard] },
  {path: "va-banque/player/play", component: PlayerGameViewComponent, canActivate:[PlayerViewGuard] },
  {path: "va-banque/ranking", component: RankingComponent },
  {path: "register", component:RegisterPageComponent},
  {path: "", component: LoginPageComponent, pathMatch: "full" },
  {path: "**", component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
