import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Question } from 'src/models/Question';
import { QuestionsService } from 'src/services/Questions/questions.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  
  allQuestions: Question[] = [];
  isLoadingResults: boolean = true;
  resultsLength: Number = 0;
  displayedColumns: string[] = ['id', 'name', 'answer', 'category', 'points', 'action'];

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.GetQuestions();
  }
  GetQuestions(){
    this.questionsService.getQuestions().subscribe((questions)=>{
      this.allQuestions = questions;
      this.isLoadingResults = false;
    })
  }
  deleteQuestion(id: string){
    this.questionsService.deleteQuestion(id).subscribe(()=>{
      this.isLoadingResults = true;
      this.GetQuestions();
    })
  }
}
