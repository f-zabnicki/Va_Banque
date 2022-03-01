import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "../app-routing.module";
import { AddQuestionsComponent } from "./add-questions/add-questions.component";
import { AdminGameViewComponent } from "./admin-game-view/admin-game-view.component";
import { AdminMainComponent } from "./admin-main/admin-main.component";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { CategoryButtonComponent } from "./category-button/category-button.component";
import { CreateGameComponent } from "./create-game/create-game.component";
import { EditQuestionsComponent } from "./edit-questions/edit-questions.component";
import { QuestionsListComponent } from "./questions-list/questions-list.component";
import { UserButtonComponent } from "./user-button/user-button.component";
import { UserDetailsListComponent } from "./user-details-list/user-details-list.component";

@NgModule({
    declarations: [
        CreateGameComponent,
        UserButtonComponent,
        CategoryButtonComponent,
        AdminMainComponent,
        AdminGameViewComponent,
        EditQuestionsComponent,
        AddQuestionsComponent,
        UserDetailsListComponent,
        CategoriesListComponent,
        QuestionsListComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTabsModule,
        MatGridListModule,
        MatTableModule,
        MatButtonModule
    ],
    exports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTabsModule,
        MatGridListModule,
        MatTableModule,
        MatButtonModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AdminModule { }