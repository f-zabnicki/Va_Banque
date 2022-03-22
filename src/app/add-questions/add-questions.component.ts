import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Question } from 'src/models/Question';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/Category/category.service';
import { AddEditQuestionsService } from 'src/services/Add-edit-question/add-edit-questions.service'; 

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  unsubscribe$: Subject<void> = new Subject<void>();
  questions!: Question[];
  categories!: Category[];
  question!: Question;
  selectedCategory!: Category;
  selectedQuestion: any;
  createdMode = false;
  errorMode = false;
  constructor(private AddEditQuestionsService: AddEditQuestionsService, private CategoryService: CategoryService) { }
  form = new FormGroup({
    content: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    points: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getAllCategories();
  }
  onSubmit() {
      this.AddEditQuestionsService.addQuestion(this.form.value).subscribe((question) => {
        this.AddEditQuestionsService.getAllQuestions();
        this.AddEditQuestionsService.updateView(question);
        this.createdMode = true;
        this.formListener();
        window.location.href='va-banque/admin-main';
      },error=>{
        this.errorMode = true;
      });
     
  }
  
  private getAllCategories() {
    this.CategoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
     
    });
  }
  formListener() {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        console.log(value);
      });
  }
}
