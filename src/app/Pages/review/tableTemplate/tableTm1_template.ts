import { OnInit, Component } from '@angular/core';
import {
  Margins,
  PageOrientation,
  PageSize,
  Alignment,
  Decoration,
  Column,
  PageBreak,
} from 'pdfmake/interfaces';
import { measurementTM1 } from 'src/app/share/models/form/measurementTM1.model';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { GetDataService } from 'src/app/share/services/get-data.service';
import { LocalService } from 'src/app/share/services/local.service';
import { FormTm1Service } from '../form-tm1.service';
import { formTM1 } from 'src/app/share/models/form/formTM1.model';
import { ReportIndexesService } from 'src/app/share/services/report-indexes.service';
import { main } from 'src/app/share/models/local.model';
import { ReportIndex } from 'src/app/share/models/report-index.model';
import { part } from 'src/app/share/models/part.model';

interface form_id_name {
  idForm: number;
  nameForm: string;
}
@Component({
  selector: 'app-review',
  template: '<h2>hteml</h2>',
  styles: ['h1 { font-weight: normal; }'],
})
export class TableTm1_Template {
  form_id_name: form_id_name[] = [];

  listRow: measurementTM1[] = [];

  formTM1: formTM1 = {
    code: '',
    strakePosition: '',
    measurementTM1List: this.listRow,
  };
  mainData!: main;
  reportIndex!: ReportIndex;
  parts: part[] = [];
  test: string = 'abc';

  constructor(
    private dataTm1S: FormTm1Service,
    private localService: LocalService,
    private generalParticularervice: GetDataService,
    private reportIndexService: ReportIndexesService
  ) {
    console.log('456');

    generalParticularervice.getGeneralParticularsFromAPI().subscribe((data) => {
      // this.generalParticular = data;
      // console.log(this.generalParticular);
      this.mainData = this.localService.getMainData();

      this.reportIndexService
        .getReportIndexFromAPI(this.mainData.mainId)
        .subscribe(
          (data) => {
            this.reportIndex = data;
            console.log('Data:', data);
            console.log('Report Index:', this.reportIndex);
            this.parts = this.reportIndex.parts;

            this.form_id_name = this.parts.flatMap((part) =>
              part.forms.map((form) => ({
                idForm: form.formID,
                nameForm: form.name,
              }))
            );
            console.log(this.form_id_name);
            this.test = 'bcd';

            for (let i = 0; i < this.form_id_name.length; i++) {
              if (this.form_id_name[i].nameForm === 'FORM TM1') {
                this.dataTm1S
                  .getDataTm1FromApi('tm1s', this.form_id_name[i].idForm)
                  .subscribe((data) => {
                    this.formTM1 = data;
                    console.log(this.formTM1);
                  });
              }
            }
          },
          (err) => {
            console.log(err);
            console.log('error');
          }
        );
      console.log(this.test);
    });
  }
  generalParticular: GeneralParticular[] = [];

  a = [1, 2];
  formsGet = [
    {
      name: 'tm1',
      test: '111',
      measureTm1: [
        {
          id: 1,
          structural: 'Plating',
          originThickness: 18,
          detailEquipment: {
            gaugedP: 19,
            gaugedS: 20,
          },
        },
        {
          id: 2,
          structural: 'Plating2',
          originThickness: 182,
          detailEquipment: {
            gaugedP: 19,
            gaugedS: 20,
          },
        },
      ],
    },
    {
      name: 'tm1',
      test: '222',
      measureTm1: [
        {
          id: 1,
          structural: 'Plating',
          originThickness: 18,
          detailEquipment: {
            gaugedP: 19,
            gaugedS: 20,
          },
        },
        {
          id: 2,
          structural: 'Plating2',
          originThickness: 182,
          detailEquipment: {
            gaugedP: 19,
            gaugedS: 20,
          },
        },
      ],
    },
    {
      name: 'tm2',
      test: '333',
      measureTm2: [
        {
          id: 1,
          structuralMember: 'Dessk',
          originThickness: 11,
        },
        {
          id: 2,
          structuralMeber: 'Dessk',
          originThickness: 112,
        },
      ],
    },
  ];
  measureformsTm1 = this.formsGet.find(
    (form) => form.name === 'tm1' && form.test == '111'
  )?.measureTm1;
  measureformsTm1_c = this.formsGet.find(
    (form) => form.name === 'tm1' && form.test == '222'
  )?.measureTm1;

  formsTm1 = this.formsGet.filter((x) => x.name == 'tm1');

  tableTm1_template = {
    headerRows: 10,
    //23 rows
    widths: [
      '4%',
      '34.5%',
      '6%',
      '4.5%',
      '3%',
      '3%',
      '3%',
      '3%',
      '1.5%', //9
      '3%',
      '3%',
      '1.5%', //12
      '3%',
      '3%',
      '3%',
      '3%',
      '1.5%', //17
      '3%',
      '3%',
      '1.5%', //20
      '3%',
      '3%',
      '3%',
    ],
    body: [
      //Table header
      [
        {
          text: `${this.test}`,
          //   text: `TM1-${this.typeForm}(1 July 2023)`,
          style: ['txt_center'],
          colSpan: 23,
          alignment: 'right' as Alignment,
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          text: '',
          colSpan: 23,
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      // table info
      [
        {
          text: 'Report on THICKNESS MEASUREMENT of ALL DECK PLATING, ALL BOTTOM SHELL PLATING or SIDE SHELL PLATING',
          style: ['txt_center', 'fontS11'],
          colSpan: 23,
          decoration: 'underline' as Decoration,
          bold: true,
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          colSpan: 23,
          text: '',
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          text: "Ship's name:",
          alignment: 'center' as Alignment,
          colSpan: 2,
          border: [false, false, false, false],
        },
        {},
        {
          decoration: 'underline' as Decoration,
          text: 'M/T "TM THAI HA"',
          colSpan: 5,
          bold: true,
          border: [false, false, false, false],
        },
        {},
        {},
        {},
        {},
        {
          text: 'Class Identity No. ',
          colSpan: 3,
          border: [false, false, false, false],
        },
        {},
        {},
        {
          decoration: 'underline' as Decoration,
          text: '2312321',
          colSpan: 5,
          bold: true,
          border: [false, false, false, false],
        },
        {},
        {},
        {},
        {},

        {
          text: 'Report No. ',
          colSpan: 3,
          border: [false, false, false, false],
        },
        {},
        {},
        {
          decoration: 'underline' as Decoration,

          text: 'VMC.TUM 123',
          colSpan: 5,
          bold: true,
          border: [false, false, false, false],
        },

        {},
        {},
        {},
        {},
      ],
      [
        {
          colSpan: 23,
          text: '',
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      // table content
      [
        {
          text: 'STRAKE POSITION',
          alignment: 'left' as Alignment,
          colSpan: 2,
          style: 'txt_center',
        },
        {},
        {
          text: `${this.formsGet[0].test}`,
          colSpan: 21,
          rowSpan: 1,
          bold: true,
        },
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          style: 'txt_center',
          text: 'No.',
          rowSpan: 3,
        },
        {
          style: 'txt_center',
          text: 'PLATE POSITION',
          rowSpan: 3,
        },
        { style: 'txt_center', text: 'No. or Letter', rowSpan: 3 },
        { style: 'txt_center', text: 'Org.Thk.', rowSpan: 3 },
        { style: 'txt_center', text: 'Forward Reading', colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        { style: 'txt_center', text: 'Aft Reading', colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {
          style: 'txt_center',
          text: 'Mean Dimunution (%)',
          colSpan: 2,
          rowSpan: 2,
        },
        {},

        { style: 'txt_center', text: 'Max Alwb Dim', rowSpan: 2 },
      ],
      [
        {},
        {},
        {},
        {},
        { text: 'Gauged (mm)', colSpan: 2, style: 'txt_center' },
        {},
        { text: 'Diminution P (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},
        { text: 'Diminution S (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},

        { text: 'Gauged (mm)', colSpan: 2, style: 'txt_center' },
        {},
        { text: 'Diminution P (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},
        { text: 'Diminution S (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},

        { text: '', colSpan: 2, style: 'txt_center' },

        {},
        { text: 'Max Alwb Dim' },
      ],
      [
        {},
        {},
        {},
        {},
        { text: 'P', style: 'txt_center' },
        { text: 'S', style: 'txt_center' },
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},

        { text: 'P', style: 'txt_center' },
        { text: 'S', style: 'txt_center' },
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},

        { text: 'P', style: 'txt_center' },
        { text: 'S', style: 'txt_center' },
        { text: 'mm', style: 'txt_center' },
      ],
      ...this.measureformsTm1!.map((x) => [
        x.id,
        x.originThickness,
        x.structural,
        x.detailEquipment.gaugedP,
        x.detailEquipment.gaugedS,
        x.id,
        x.originThickness,
        {
          text: `${x.id}`,
          style: 'txt_center',
          border: [true, true, false, true],
        },
        {
          text: `${x.originThickness}`,
          border: [false, true, true, true],
        },
        x.detailEquipment.gaugedS,

        {
          text: `${x.id}`,
          style: 'txt_center',
          border: [true, true, false, true],
        },

        {
          text: `${x.originThickness}`,
          border: [false, true, true, true],
        }, //12
        x.structural,
        x.detailEquipment.gaugedP,
        x.detailEquipment.gaugedS,
        {
          //16
          text: `${x.id}`,
          style: 'txt_center',
          border: [true, true, false, true],
        },
        {
          text: `${x.originThickness}`,
          border: [false, true, true, true],
        },
        x.structural,
        {
          text: `${x.id}`,
          style: 'txt_center',
          border: [true, true, false, true],
        },
        {
          text: `${x.originThickness}`,
          border: [false, true, true, true],
        },
        x.id,
        x.originThickness,
        x.structural,
      ]),
    ],
  };
  tableTm1_template_cc = {
    headerRows: 10,
    //23 rows
    widths: [
      '4%',
      '34.5%',
      '6%',
      '4.5%',
      '3%',
      '3%',
      '3%',
      '3%',
      '1.5%', //9
      '3%',
      '3%',
      '1.5%', //12
      '3%',
      '3%',
      '3%',
      '3%',
      '1.5%', //17
      '3%',
      '3%',
      '1.5%', //20
      '3%',
      '3%',
      '3%',
    ],
    body: [
      //Table header
      [
        {
          text: `TM1-(1 July 2023)`,
          //   text: `TM1-${this.typeForm}(1 July 2023)`,
          style: ['txt_center'],
          colSpan: 23,
          alignment: 'right' as Alignment,
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          text: '',
          colSpan: 23,
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      // table info
      [
        {
          text: 'Report on THICKNESS MEASUREMENT of ALL DECK PLATING, ALL BOTTOM SHELL PLATING or SIDE SHELL PLATING',
          style: ['txt_center', 'fontS11'],
          colSpan: 23,
          decoration: 'underline' as Decoration,
          bold: true,
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          colSpan: 23,
          text: '',
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          text: "Ship's name:",
          alignment: 'center' as Alignment,
          colSpan: 2,
          border: [false, false, false, false],
        },
        {},
        {
          decoration: 'underline' as Decoration,
          text: 'M/T "TM THAI HA"',
          colSpan: 5,
          bold: true,
          border: [false, false, false, false],
        },
        {},
        {},
        {},
        {},
        {
          text: 'Class Identity No. ',
          colSpan: 3,
          border: [false, false, false, false],
        },
        {},
        {},
        {
          decoration: 'underline' as Decoration,
          text: '2312321',
          colSpan: 5,
          bold: true,
          border: [false, false, false, false],
        },
        {},
        {},
        {},
        {},

        {
          text: 'Report No. ',
          colSpan: 3,
          border: [false, false, false, false],
        },
        {},
        {},
        {
          decoration: 'underline' as Decoration,

          text: 'VMC.TUM 123',
          colSpan: 5,
          bold: true,
          border: [false, false, false, false],
        },

        {},
        {},
        {},
        {},
      ],
      [
        {
          colSpan: 23,
          text: '',
          border: [false, false, false, false],
        },
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      // table content
      [
        {
          text: 'STRAKE POSITION',
          alignment: 'left' as Alignment,
          colSpan: 2,
          style: 'txt_center',
        },
        {},
        {
          text: `${this.formsGet[0].test}`,
          colSpan: 21,
          rowSpan: 1,
          bold: true,
        },
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {
          style: 'txt_center',
          text: 'No.',
          rowSpan: 3,
        },
        {
          style: 'txt_center',
          text: 'PLATE POSITION',
          rowSpan: 3,
        },
        { style: 'txt_center', text: 'No. or Letter', rowSpan: 3 },
        { style: 'txt_center', text: 'Org.Thk.', rowSpan: 3 },
        { style: 'txt_center', text: 'Forward Reading', colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        { style: 'txt_center', text: 'Aft Reading', colSpan: 8 },
        {},
        {},
        {},
        {},
        {},
        {},
        {},

        {
          style: 'txt_center',
          text: 'Mean Dimunution (%)',
          colSpan: 2,
          rowSpan: 2,
        },
        {},

        { style: 'txt_center', text: 'Max Alwb Dim', rowSpan: 2 },
      ],
      [
        {},
        {},
        {},
        {},
        { text: 'Gauged (mm)', colSpan: 2, style: 'txt_center' },
        {},
        { text: 'Diminution P (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},
        { text: 'Diminution S (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},

        { text: 'Gauged (mm)', colSpan: 2, style: 'txt_center' },
        {},
        { text: 'Diminution P (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},
        { text: 'Diminution S (mm)', colSpan: 3, style: 'txt_center' },
        {},
        {},

        { text: '', colSpan: 2, style: 'txt_center' },

        {},
        { text: 'Max Alwb Dim' },
      ],
      [
        {},
        {},
        {},
        {},
        { text: 'P', style: 'txt_center' },
        { text: 'S', style: 'txt_center' },
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},

        { text: 'P', style: 'txt_center' },
        { text: 'S', style: 'txt_center' },
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},
        { text: 'mm', style: 'txt_center' },
        { text: '%', style: 'txt_center', colSpan: 2 },
        {},

        { text: 'P', style: 'txt_center' },
        { text: 'S', style: 'txt_center' },
        { text: 'mm', style: 'txt_center' },
      ],
      ...this.measureformsTm1_c!.map((x) => [
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
        x.structural,
        x.id,
        x.originThickness,
      ]),
    ],
  };
}
