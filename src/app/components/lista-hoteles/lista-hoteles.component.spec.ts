import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHotelesComponent } from './lista-hoteles.component';

describe('ListaHotelesComponent', () => {
  let component: ListaHotelesComponent;
  let fixture: ComponentFixture<ListaHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaHotelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
