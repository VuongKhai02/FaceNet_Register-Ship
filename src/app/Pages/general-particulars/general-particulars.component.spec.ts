import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralParticularsComponent } from './general-particulars.component';

describe('GeneralParticularsComponent', () => {
  let component: GeneralParticularsComponent;
  let fixture: ComponentFixture<GeneralParticularsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralParticularsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralParticularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
