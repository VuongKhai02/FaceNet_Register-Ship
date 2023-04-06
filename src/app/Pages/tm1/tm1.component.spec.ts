import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm1Component } from './tm1.component';

describe('Tm1Component', () => {
  let component: Tm1Component;
  let fixture: ComponentFixture<Tm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
