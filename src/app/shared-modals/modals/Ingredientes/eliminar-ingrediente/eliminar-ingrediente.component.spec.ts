import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarIngredienteComponent } from './eliminar-ingrediente.component';

describe('EliminarIngredienteComponent', () => {
  let component: EliminarIngredienteComponent;
  let fixture: ComponentFixture<EliminarIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarIngredienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
