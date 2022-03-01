import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Category } from 'src/models/category';
import { QuestionTest } from 'src/models/questionTest';
import { Question } from 'src/models/Question';
import { AddEditQuestionsService } from 'src/services/add-edit-questions.service';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.scss']
})
export class EditQuestionsComponent implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();
  categories!: Category[];
  question!: QuestionTest;
  selectedCategory?: Category;
  selectedQuestion!: QuestionTest;
  id: Guid = Guid.createEmpty();
  errorMode = false;
  editedMode = false;
  form = this.initializeForm();

  constructor(private AddEditQuestionsService: AddEditQuestionsService,
    private CategoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.questionListener();
    this.getQuestion();
    this.getAllCategories();
    this.initializeForm();
  }

  initializeForm(): FormGroup {
    return new FormGroup({
      content: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.question.content = this.form.value.content;
    this.question.answer = this.form.value.answer;
    this.question.categoryId = this.form.value.categoryId;
    this.question.points = this.form.value.points;
    this.AddEditQuestionsService.editQuestion(this.question, this.question.id).subscribe((question: Question) => {
      this.AddEditQuestionsService.getAllQuestions();
      this.AddEditQuestionsService.updateView(question);
      this.formListener()
      this.editedMode = true;
      this.router.navigate(['va-banque/admin-main']);
    }, error => {
      this.errorMode = true;
    });
  }
  private getAllCategories() {
    this.CategoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      this.selectedCategory = this.categories.find((category) => category.id === this.question.categoryId);
    });
  }

  formListener() {
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  questionListener(): void {
    this.route.params.subscribe(params => this.id = params.id);
  }

  getQuestion() {
    this.AddEditQuestionsService.getQuestion(this.id).subscribe((question: QuestionTest) => {
      this.question = question;
      this.form.setValue({
        content: question.content,
        answer: question.answer,
        categoryId: question.categoryId,
        points: question.points,
      });
    });
  }
}
