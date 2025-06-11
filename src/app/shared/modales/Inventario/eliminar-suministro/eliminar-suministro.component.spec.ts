import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSuministroComponent } from './eliminar-suministro.component';

describe('EliminarSuministroComponent', () => {
  let component: EliminarSuministroComponent;
  let fixture: ComponentFixture<EliminarSuministroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarSuministroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarSuministroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
