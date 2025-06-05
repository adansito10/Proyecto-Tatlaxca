import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarOrdenComponent } from './eliminar-orden.component';

describe('EliminarOrdenComponent', () => {
  let component: EliminarOrdenComponent;
  let fixture: ComponentFixture<EliminarOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarOrdenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
