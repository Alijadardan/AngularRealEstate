import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertieCardStaticComponent } from './propertie-card-static.component';

describe('PropertieCardStaticComponent', () => {
  let component: PropertieCardStaticComponent;
  let fixture: ComponentFixture<PropertieCardStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertieCardStaticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertieCardStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
