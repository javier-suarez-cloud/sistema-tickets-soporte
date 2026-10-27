import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioTicket } from './formulario-ticket';

describe('FormularioTicket', () => {
  let component: FormularioTicket;
  let fixture: ComponentFixture<FormularioTicket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioTicket],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTicket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
