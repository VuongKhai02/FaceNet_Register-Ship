import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm2Component } from './tm2.component';

describe('Tm2Component', () => {
  let component: Tm2Component;
  let fixture: ComponentFixture<Tm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
