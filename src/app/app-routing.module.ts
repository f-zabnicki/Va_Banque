import { CreateGameComponent } from './Admin/create-game/create-game.component';
import { AdminMainComponent } from './Admin/admin-main/admin-main.component';
import { AddQuestionsComponent } from './Admin/add-questions/add-questions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGameViewComponent } from './Admin/admin-game-view/admin-game-view.component';
import { AdminViewGuard } from 'src/guard/admin-view.guard';
import { PlayerViewGuard } from 'src/guard/player-view.guard';
import { EditQuestionsComponent } from './Admin/edit-questions/edit-questions.component';
import { PlayerGameViewComponent } from './Player/player-game-view/player-game-view.component';
import { RankingComponent } from './Player/ranking/ranking.component';
import { RegisterPageComponent } from './Shared/register-page/register-page.component';
import { LoginPageComponent } from './Shared/login-page/login-page.component';

const routes: Routes = [
  {path: "va-banque/admin-main/new", component: AddQuestionsComponent, canActivate:[AdminViewGuard] },
  {path: "va-banque/admin-main", component: AdminMainComponent, canActivate:[AdminViewGuard] },
  {path: 'va-banque/admin-main/questions/edit/:id', component: EditQuestionsComponent, canActivate:[AdminViewGuard] },
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
