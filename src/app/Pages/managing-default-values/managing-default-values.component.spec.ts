import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingDefaultValuesComponent } from './managing-default-values.component';

describe('ManagingDefaultValuesComponent', () => {
  let component: ManagingDefaultValuesComponent;
  let fixture: ComponentFixture<ManagingDefaultValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagingDefaultValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagingDefaultValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
