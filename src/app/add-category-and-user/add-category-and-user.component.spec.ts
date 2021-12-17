import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryAndUserComponent } from './add-category-and-user.component';

describe('AddCategoryAndUserComponent', () => {
  let component: AddCategoryAndUserComponent;
  let fixture: ComponentFixture<AddCategoryAndUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryAndUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryAndUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
