import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm7Component } from './tm7.component';

describe('Tm7Component', () => {
  let component: Tm7Component;
  let fixture: ComponentFixture<Tm7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
