import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerIngredientesComponent } from './ver-ingredientes.component';

describe('VerIngredientesComponent', () => {
  let component: VerIngredientesComponent;
  let fixture: ComponentFixture<VerIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerIngredientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
