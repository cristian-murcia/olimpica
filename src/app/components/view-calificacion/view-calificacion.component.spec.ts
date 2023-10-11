import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalificacionComponent } from './view-calificacion.component';

describe('ViewCalificacionComponent', () => {
  let component: ViewCalificacionComponent;
  let fixture: ComponentFixture<ViewCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCalificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
