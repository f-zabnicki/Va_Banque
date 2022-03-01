import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerGameViewComponent } from './Player/player-game-view/player-game-view.component';
import { RankingComponent } from './Player/ranking/ranking.component';
import { LoginPageComponent } from './Shared/login-page/login-page.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { RegisterPageComponent } from './Shared/register-page/register-page.component';
import { AdminModule } from './Admin/admin.module';
@NgModule({
  declarations: [
    AppComponent,
    PlayerGameViewComponent,
    RankingComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
