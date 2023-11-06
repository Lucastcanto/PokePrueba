import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirCartasComponent } from './abrir-cartas.component';

describe('AbrirCartasComponent', () => {
  let component: AbrirCartasComponent;
  let fixture: ComponentFixture<AbrirCartasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirCartasComponent]
    });
    fixture = TestBed.createComponent(AbrirCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
