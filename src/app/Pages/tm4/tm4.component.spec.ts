import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm4Component } from './tm4.component';

describe('Tm4Component', () => {
  let component: Tm4Component;
  let fixture: ComponentFixture<Tm4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
