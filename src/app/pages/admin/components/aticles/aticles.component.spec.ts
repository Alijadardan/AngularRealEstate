import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AticlesComponent } from './aticles.component';

describe('AticlesComponent', () => {
  let component: AticlesComponent;
  let fixture: ComponentFixture<AticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
