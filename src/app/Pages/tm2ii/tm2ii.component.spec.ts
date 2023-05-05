import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm2iiComponent } from './tm2ii.component';

describe('Tm2iiComponent', () => {
  let component: Tm2iiComponent;
  let fixture: ComponentFixture<Tm2iiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm2iiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm2iiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
