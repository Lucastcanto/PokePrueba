import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeccionSeguidorComponent } from './coleccion-seguidor.component';

describe('ColeccionSeguidorComponent', () => {
  let component: ColeccionSeguidorComponent;
  let fixture: ComponentFixture<ColeccionSeguidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColeccionSeguidorComponent]
    });
    fixture = TestBed.createComponent(ColeccionSeguidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
