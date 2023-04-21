import { certificate } from './../../share/models/certificate.model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CertificateService } from 'src/app/share/services/certificate.service';

@Component({
  selector: 'app-managing-default-values',
  templateUrl: './managing-default-values.component.html',
  styleUrls: ['./managing-default-values.component.css'],
})
export class ManagingDefaultValuesComponent implements OnInit {
  certificates: certificate[] = [];

  constructor(
    private message: NzMessageService,
    private certificateService: CertificateService
  ) {}

  ngOnInit(): void {
    this.certificateService.getCertificateFromAPI().subscribe(
      (data) => {
        this.certificates = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  panels = [
    {
      active: false,
      name: 'Details of measurement equipment',
      disabled: false,
      adding: false,
      newItem: '',
      items: ['T-GAGE V (Serri 05058879)', 'OLYMPUS 27MG (Serri 150239211)'],
    },
    {
      active: false,
      name: 'Structural member of tm4',
      disabled: false,
      adding: false,
      newItem: '',
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
      newItem: '',
      items: ['items', 'Deck Beam', 'Deck Girder - Web', 'Deck Girder - Face'],
    },
    {
      active: false,
      disabled: false,
      name: 'Frame number of tm7',
      adding: false,
      newItem: '',
      items: ['Web', 'Side Shell', 'Face'],
    },
    {
      active: false,
      disabled: false,
      name: 'Strake position of tm2',
      adding: false,
      newItem: '',
      items: ['Web', 'Face', 'Side Shell'],
    },
    {
      active: false,
      disabled: false,
      name: 'Structural member of tm3',
      adding: false,
      newItem: '',
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
      newItem: '',
      items: ['Plating'],
    },
  ];

  addItem(i: number) {
    this.panels[i].items.push(this.panels[i].newItem);
    this.panels[i].newItem = '';
    this.message.create('success', 'Add new success');
  }

  cancel() {}

  deleteItem(i: number, j: number) {
    this.panels[i].items.splice(j, 1);
  }

  editItem(i: number, j: number) {}
}
