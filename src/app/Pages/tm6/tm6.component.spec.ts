import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm6Component } from './tm6.component';

describe('Tm6Component', () => {
  let component: Tm6Component;
  let fixture: ComponentFixture<Tm6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
