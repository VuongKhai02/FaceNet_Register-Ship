import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm5Component } from './tm5.component';

describe('Tm5Component', () => {
  let component: Tm5Component;
  let fixture: ComponentFixture<Tm5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
