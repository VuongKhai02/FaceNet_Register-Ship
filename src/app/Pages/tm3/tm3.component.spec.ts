import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm3Component } from './tm3.component';

describe('Tm3Component', () => {
  let component: Tm3Component;
  let fixture: ComponentFixture<Tm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
