import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularPropertiesComponent } from './popular-properties.component';

describe('PopularPropertiesComponent', () => {
  let component: PopularPropertiesComponent;
  let fixture: ComponentFixture<PopularPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularPropertiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
