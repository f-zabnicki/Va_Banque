import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/Category/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  allCategories: Category[] = [];
  isLoadingResults: boolean = true;
  resultsLength: Number = 0;
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories(){
    this.categoryService.getAllCategories().subscribe((categories)=>{
      this.allCategories = categories;
      this.isLoadingResults = false;
    })
  }
  removeCategory(id: Guid){
    this.categoryService.remove(id).subscribe(()=>{
      this.GetCategories();
    })
  }

}
