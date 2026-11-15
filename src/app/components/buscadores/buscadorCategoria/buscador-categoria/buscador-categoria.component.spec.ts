import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorCategoriaComponent } from './buscador-categoria.component';

describe('BuscadorCategoriaComponent', () => {
  let component: BuscadorCategoriaComponent;
  let fixture: ComponentFixture<BuscadorCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
