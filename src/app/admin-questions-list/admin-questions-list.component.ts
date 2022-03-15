import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Category } from 'src/models/category';
import { Question } from 'src/models/Question';
import { QuestionTest } from 'src/models/questionTest';
import { CategoryService } from 'src/services/Category/category.service';
import { QuestionsService } from 'src/services/Questions/questions.service';

@Component({
  selector: 'app-admin-questions-list',
  templateUrl: './admin-questions-list.component.html',
  styleUrls: ['./admin-questions-list.component.scss']
})
export class AdminQuestionsListComponent implements OnInit {

  questions: Question[] = [];
  tempQuestion!: QuestionTest[];
  temp!:Category;
  ascending = true;
  sortingColumn = 1;

  constructor(private questionsService: QuestionsService, private categorySevice : CategoryService) { }

  ngOnInit(): void {
    this.questionsListListener();
  }

  private questionsListListener() {
    this.questionsService.getQuestions().subscribe((questionsFromApi: QuestionTest[]) => {
      this.tempQuestion = questionsFromApi;
      this.categorySevice.getAllCategories().subscribe((cat: Category[])=>{
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