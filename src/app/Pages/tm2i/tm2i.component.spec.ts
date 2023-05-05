import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tm2iComponent } from './tm2i.component';

describe('Tm2iComponent', () => {
  let component: Tm2iComponent;
  let fixture: ComponentFixture<Tm2iComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tm2iComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tm2iComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
