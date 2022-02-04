import { WhoYouAreComponent } from './who-you-are/who-you-are.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { AdminQuestionsListComponent } from './admin-questions-list/admin-questions-list.component';
import { CategoryButtonComponent } from './category-button/category-button.component';
import { UserButtonComponent } from './user-button/user-button.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AddCategoryAndUserComponent } from './add-category-and-user/add-category-and-user.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminGameViewComponent } from './admin-game-view/admin-game-view.component';
import { PlayerGameViewComponent } from './player-game-view/player-game-view.component';
import { RankingComponent } from './ranking/ranking.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsListComponent } from './user-details-list/user-details-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
@NgModule({
  declarations: [
    AppComponent,
    CreateGameComponent,
    UserButtonComponent,
    CategoryButtonComponent,
    AdminMainComponent,
    AddCategoryAndUserComponent,
    AdminGameViewComponent,
    PlayerGameViewComponent,
    RankingComponent,
    AdminQuestionsListComponent,
    EditQuestionsComponent,
    WhoYouAreComponent,
    AddQuestionsComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    UserDetailsListComponent,
    CategoriesListComponent,
    QuestionsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatGridListModule,
    ScrollingModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
