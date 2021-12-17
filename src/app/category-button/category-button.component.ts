import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss']
})
export class CategoryButtonComponent implements OnInit {

  @Input() index!: number;
  @Input() categories!: any[];

  selectedCategory!: Category;

  @Output() categorySelectedEvent = new EventEmitter<[Category, number]>();

  constructor() { }

  ngOnInit(): void {
  }

  onElementClick(category: Category){
    this.selectedCategory = category;
    this.categorySelectedEvent.emit([category, this.index]);
  }
}
