import { Component } from '@angular/core';

@Component({
  selector: 'app-managing-default-values',
  templateUrl: './managing-default-values.component.html',
  styleUrls: ['./managing-default-values.component.css'],
})
export class ManagingDefaultValuesComponent {
  panels = [
    {
      active: false,
      name: 'This is panel header 1',
      disabled: false,
      adding: false,
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2',
      adding: false,
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3',
      adding: false,
    },
  ];
}
