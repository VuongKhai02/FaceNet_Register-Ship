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
      name: 'Details of measurement equipment',
      disabled: false,
      adding: false,
      items: ['T-GAGE V (Serri 05058879)', 'OLYMPUS 27MG (Serri 150239211)'],
    },
    {
      active: false,
      name: 'Structural member of tm4',
      disabled: false,
      adding: false,
      items: [
        'Web Plating',
        'Longi Bulkhead',
        'T.S.T Bottom Longi',
        'Main Deck Plating',
        'T.S.T Bottom Plate',
      ],
    },
    {
      active: false,
      disabled: false,
      name: 'Description of tm6',
      adding: false,
      items: ['items', 'Deck Beam', 'Deck Girder - Web', 'Deck Girder - Face'],
    },
    {
      active: false,
      disabled: false,
      name: 'Frame number of tm7',
      adding: false,
      items: ['Web', 'Side Shell', 'Face'],
    },
    {
      active: false,
      disabled: false,
      name: 'Strake position of tm2',
      adding: false,
      items: ['Web', 'Face', 'Side Shell'],
    },
    {
      active: false,
      disabled: false,
      name: 'Structural member of tm3',
      adding: false,
      items: [
        'Hatch Coaming',
        'Hatch Coaming',
        'T.S.T Bottom Plate',
        'Hopper Plate',
        'Bottom Longi',
        'Side longi',
        'T.S.T Bottom Longi',
        'Side Girder',
        'Longi BHD',
      ],
    },
    {
      active: false,
      disabled: false,
      name: 'Structural component (plating/stiffener)',
      adding: false,
      items: ['Plating'],
    },
  ];
}
