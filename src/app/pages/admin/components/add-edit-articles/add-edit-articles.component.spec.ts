import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditArticlesComponent } from './add-edit-articles.component';

describe('AddEditArticlesComponent', () => {
  let component: AddEditArticlesComponent;
  let fixture: ComponentFixture<AddEditArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
