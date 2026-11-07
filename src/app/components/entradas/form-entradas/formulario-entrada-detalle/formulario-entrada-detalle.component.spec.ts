import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEntradaDetalleComponent } from './formulario-entrada-detalle.component';

describe('FormularioEntradaDetalleComponent', () => {
  let component: FormularioEntradaDetalleComponent;
  let fixture: ComponentFixture<FormularioEntradaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEntradaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEntradaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
