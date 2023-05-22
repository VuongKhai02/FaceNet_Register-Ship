import { Component, OnInit } from '@angular/core';
import { TableTm1_Template } from './tableTemplate/tableTm1_template';
import { tableTm2i_template } from './tableTemplate/tableTm2i_template';
import { tableTm2ii_template } from './tableTemplate/tableTm2ii_template';
import { tableTm3_template } from './tableTemplate/tableTm3_template';
import { tableTm4_template } from './tableTemplate/tableTm4_template';
import { tableTm5_template } from './tableTemplate/tableTm5_template';
import { tableTm6_template } from './tableTemplate/tableTm6_template';
import { tableTm7_template } from './tableTemplate/tableTm7_template';
import { tableTm1_template_c } from './tableTemplate/tableTm1_template_c';

import {
  Margins,
  PageOrientation,
  PageSize,
  Alignment,
  Decoration,
  Column,
  PageBreak,
} from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ShipService } from 'src/app/share/services/ships.service';
import { ship } from 'src/app/share/models/ship.model';
import { GetDataService } from 'src/app/share/services/get-data.service';
import { GeneralParticular } from 'src/app/share/models/generalParticulars.model';
import { CertificateService } from 'src/app/share/services/certificate.service';
import { certificate } from 'src/app/share/models/certificate.model';
import { LocalService } from 'src/app/share/services/local.service';
import { main } from 'src/app/share/models/local.model';
import { ParamValueService } from 'src/app/share/services/param-value.service';
import { ReportIndexesService } from 'src/app/share/services/report-indexes.service';
import { ReportIndex } from 'src/app/share/models/report-index.model';
import { formTM1 } from 'src/app/share/models/form/formTM1.model';
import { part } from 'src/app/share/models/part.model';
import { measurementTM1 } from 'src/app/share/models/form/measurementTM1.model';
import { FormTm1Service } from './form-tm1.service';
import { measurementTM3 } from 'src/app/share/models/form/measurementTM3.model';
import { measurementTM5 } from 'src/app/share/models/form/measurementTM5.model';
import { measurementTM4 } from 'src/app/share/models/form/measurementTM4.model';
import { structuralDescriptionTM6 } from 'src/app/share/models/form/structuralDescriptionTM6.model';
import { frameNumberTM7 } from 'src/app/share/models/form/frameNumberTM7.model';
import { structuralMemberTM4 } from 'src/app/share/models/form/structuralMemberTM4.model';
import { measurementTM6 } from 'src/app/share/models/form/measurementTM6.model';
import { measurementTM7 } from 'src/app/share/models/form/measurementTM7.model';
import { measurementTM2 } from 'src/app/share/models/form/measurementTM2.model';
import { FormService } from 'src/app/share/services/form/form.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

interface TM4 {
  headerr: string;
  typeForm: string;
  id: number;
  structuralMember: string;
  item: string;
  originalThickness: number;
  maximumAllowableDim: number;
  gaugedP: number;
  gaugedS: number;
  diminutionPmm: number;
  diminutionPpercent: number;
  diminutionSmm: number;
  diminutionSpercent: number;
  isStandardP: boolean;
  isStandardS: boolean;
}
interface form_id_name {
  idForm: number;
  nameForm: string;
}
interface formTM1n {
  code: string;
  strakePosition: string;
  measurementTM1DTOList: measurementTM1[];
}
interface formTM2 {
  code: string;
  name: string;
  firstFrameNoTM2: string;
  secondFrameNoTM2: string;
  thirdFrameNoTM2: string;
  measurementTM2DTOList: measurementTM2[];
}

interface formTM3n {
  code: string;
  firstFrameNo: string;
  secondFrameNo: string;
  thirdFrameNo: string;
  measurementTM3DTOList: measurementTM3[];
}
interface measurementTM4Listn {
  structuralMemberTitle: string;
  measurementTM4DTOList: measurementTM4[];
}
interface formTM4n {
  code: string;
  description: string;
  name: string;
  locationOfStructure: string;
  tankHolDescription: string;
  frameNo: string;
  structuralMemberTM4List: measurementTM4Listn[];
}
interface formTM5n {
  code: string;
  description: string;
  name: string;
  locationOfStructure: string;
  tankHolDescription: string;
  frameNo: string;
  measurementTM5List: measurementTM5[];
}
interface structuralDescriptionTM6n {
  structuralDescriptionTitle: string;
  measurementTM6DTOList: measurementTM6[];
}
interface formTM6n {
  code: string;
  description: string;
  name: string;
  locationOfStructure: string;
  tankHolDescription: string;
  frameNo: string;
  structuralDescriptionTM6List: structuralDescriptionTM6n[];
}
interface frameNumberTM7n {
  name: string;
  measurementTM7DTOList: measurementTM7[];
}
interface formTM7n {
  code: string;
  description: string;
  name: string;
  locationOfStructure: string;
  tankHolDescription: string;
  frameNo: string;
  frameNumberList: frameNumberTM7n[];
}
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor(
    private dataTm1S: FormTm1Service,
    private shipSevice: ShipService,
    private generalParticularervice: GetDataService,
    private certificateService: CertificateService,
    private localService: LocalService,
    private paramService: ParamValueService,
    private reportIndexService: ReportIndexesService,
    private formService: FormService
  ) {}
  report_index: any;
  id_part: any;
  data_part: any[] = [];

  inShipName: string = '';
  inIMO: string = '';
  inABS: string = '';
  inPortOf: string = '';
  inGrossTon: number | string = '';
  inDeadWeith: number | string = '';
  inDateBuild: Date | string = '';
  inClassi: string = '';
  inCertificateName: string = '';
  inCertificateDate: Date[] | string = '';
  inCertificateNo: string = '';
  inPlaceOf: string = '';
  inFirstDate: Date | string = '';
  inLastDate: Date | string = '';
  inSpecial: string = '';
  inDetailOf: string = '';
  inQualification: string = 'SNT-TC-1A UT LEVEL 2';
  inReport: string = '';
  inOperatorName: string = '';
  inSuveyor: string = '';

  inParam_qualification: string = '';
  mainData!: main;
  reportIndex!: ReportIndex;
  mesur!: measurementTM1;
  ship: ship[] = [];
  generalParticular: GeneralParticular[] = [];
  books: any = [];
  certificate: certificate[] = [];

  parts: part[] = [];
  isTm1OfPart: boolean = false;
  isTm3OfPart: boolean = false;
  partId: number[] = [];
  form_id_name: form_id_name[] = [];

  formTm1!: [{ code: string; strakePosition: string }];

  no: number = 1;
  lsFormTm1: formTM1n[] = [];
  lsFormTm2i: formTM2[] = [];
  lsFormTm2ii: formTM2[] = [];
  lsFormTm3: formTM3n[] = [];
  lsFormTm4: formTM4n[] = [];
  lsFormTm5: formTM5n[] = [];
  lsFormTm6: formTM6n[] = [];
  lsFormTm7: formTM7n[] = [];

  isLoadingSaveButton: boolean = false;

  //Test mục lục
  partsGet = [
    {
      partIndex: 1,
      item: 'Main Deck',
    },
    {
      partIndex: 2,
      item: 'Transverse',
    },
  ];

  imgN: string =
    'https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/67246509_111387816859260_2386012619652726784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=mq_yiuP1cvEAX8MvYsU&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDw51jhjfX5tfjXBaYXDj8k51y19mb9SGycIt5cqMpoVw&oe=6482AE6A';
  isSurveyorCheck: boolean = false;

  ckeckSurveyorSignature() {
    this.isSurveyorCheck = !this.isSurveyorCheck;

    console.log(this.report_index);
  }

  pageNumber: number = 0;
  exportPdf() {
    var checkSignature = this.isSurveyorCheck;
    var _pageCount = 0;
    this.pageNumber = 1;
    this.ckeckSurveyorSignature();
    // Defind Table of content
    var tableOfContent = {
      headerRow: 1,
      widths: ['7%', '78%', '15%'],
      body: [
        [
          {
            text: 'PART',
            style: 'txt_center',
            bold: true,
          },
          {
            text: 'ITEM',
            bold: true,
            style: 'txt_center',
          },
          {
            text: 'PAGE',
            bold: true,
            style: 'txt_center',
          },
        ],
        ...this.reportIndex.parts.map((x) => [
          {
            text: `${x.partIndex}`,
            style: ['txt_center'],
          },
          {
            text: `${x.item}`,
          },
          {
            text: `${x.partIndex}`,
          },
        ]),
      ],
    };
    // Define tables
    /*
    var tableTm1 = {
      headerRows: 10,
      //23 rows
      widths: [
        // '4%',
        '38.5%',
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
            text: `TM1`,
            //   text: `TM1-${this.typeForm}(1 July 2023)`,
            style: ['txt_center'],
            colSpan: 22,
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
        ],
        [
          {
            text: '',
            colSpan: 22,
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
        ],
        // table info
        [
          {
            text: 'Report on THICKNESS MEASUREMENT of ALL DECK PLATING, ALL BOTTOM SHELL PLATING or SIDE SHELL PLATING',
            style: ['txt_center', 'fontS11'],
            colSpan: 22,
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
        ],
        [
          {
            colSpan: 22,
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
        ],
        [
          {
            text: "Ship's name:",
            alignment: 'center' as Alignment,
            // colSpan: 2,
            border: [false, false, false, false],
          },
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
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
            text: `${this.inABS}`,
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
            text: `${this.generalParticular[0].reportNo}`,
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
            colSpan: 22,
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
        ],
        // table content
        [
          {
            text: 'STRAKE POSITION',
            alignment: 'left' as Alignment,
            style: 'txt_center',
          },
          {
            ...(this.lsFormTm1.length >= 1
              ? {
                  text: `${this.lsFormTm1[0].strakePosition}`,
                  colSpan: 21,
                  rowSpan: 1,
                  bold: true,
                }
              : {}),
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
          { text: 'Gauged mm', colSpan: 2, style: 'txt_center' },
          {},
          { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
          {},
          {},
          { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
          {},
          {},

          { text: 'Gauged (mm)', colSpan: 2, style: 'txt_center' },
          {},
          { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
          {},
          {},
          { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
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
        ...(this.lsFormTm1.length >= 1
          ? this.lsFormTm1[0].measurementTM1DTOList!.map((x) => [
              // x.noOrLetter,
              x.platePosition,
              x.afterReadingMeasurementDetail.originalThickness,
              x.noOrLetter,
              x.noOrLetter,

              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
            ])
          : []),
      ],
    };
   
    var tableTm2i = {
      headerRows: 10,
      widths: [
        // '2.2%',
        '22.4%',
        //2
        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //10
        '2.9%',
        '1.5%', //13
        '2.2%',

        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '1.5%', //20
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //23

        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //
        '2.9%',
        '2.2%',
        '1.5%', //
      ],
      body: [
        //Table header
        this.lsFormTm2i.length >= 1
          ? [
              {
                text: `TM2i-${this.lsFormTm2i[0].code}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 34,
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
            ]
          : [],
        [
          {
            text: '',
            colSpan: 34,
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
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
            style: ['txt_center', 'fontS11'],
            colSpan: 34,
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
            colSpan: 34,
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

            colSpan: 3,
            border: [false, false, false, false],
          },
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 8,
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
          {
            text: 'Class Identity No. ',
            colSpan: 4,
            border: [false, false, false, false],
          },
          {},
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 8,
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

          {
            text: 'Report No. ',
            colSpan: 3,
            border: [false, false, false, false],
          },
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.generalParticular[0].reportNo}`,
            colSpan: 8,
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
        ],
        [
          {
            colSpan: 34,
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
            text: 'STRENGTH DECK AND SHEER STRAKE PLATING',
            colSpan: 34,
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
        this.lsFormTm2i.length >= 1
          ? [
              {},
              {
                style: 'txt_center',
                text: '1st TRANSVERSE SECTION at Fr.No: ',
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm2i[0].firstFrameNoTM2}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                style: 'txt_center',
                text: '2nd TRANSVERSE SECTION at Fr.No: ',
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm2i[0].secondFrameNoTM2}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                style: 'txt_center',
                text: '3rd TRANSVERSE SECTION at Fr.No: ',
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm2i[0].thirdFrameNoTM2}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
            ]
          : [],
        [
          {
            style: 'txt_center',
            text: 'STRAKE POSITION',
            rowSpan: 2,
          },
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm  ', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: '    Diminution S  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
        ],
        [
          {},
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
        ],
      ],
    };
    // var tableTm2ii = tableTm2ii_template;
    var tableTm2ii = {
      headerRows: 10,
      widths: [
        // '2.2%',
        '22.4%',
        //2
        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //10
        '2.9%',
        '1.5%', //13
        '2.2%',

        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '1.5%', //20
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //23

        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //
        '2.9%',
        '2.2%',
        '1.5%', //
      ],
      body: [
        //Table header
        this.lsFormTm2ii.length >= 1
          ? [
              {
                text: `TM2ii-${this.lsFormTm2ii[0].code}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 34,
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
            ]
          : [
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
            colSpan: 34,
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
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
            style: ['txt_center', 'fontS11'],
            colSpan: 34,
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
            colSpan: 34,
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

            colSpan: 3,
            border: [false, false, false, false],
          },
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 8,
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
          {
            text: 'Class Identity No. ',
            colSpan: 4,
            border: [false, false, false, false],
          },
          {},
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 8,
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

          {
            text: 'Report No. ',
            colSpan: 3,
            border: [false, false, false, false],
          },
          {},
          {},
          {
            decoration: 'underline' as Decoration,

            text: `${this.generalParticular[0].reportNo}`,
            colSpan: 8,
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
        ],
        [
          {
            colSpan: 34,
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
            text: 'SHELL PLATING',
            colSpan: 34,
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
        this.lsFormTm2ii.length >= 1
          ? [
              {},
              {
                style: 'txt_center',
                text: '1st TRANSVERSE SECTION at Fr.No: ',
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm2ii[0].firstFrameNoTM2}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                style: 'txt_center',
                text: '2nd TRANSVERSE SECTION at Fr.No: ',
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm2i[0].secondFrameNoTM2}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                style: 'txt_center',
                text: '3rd TRANSVERSE SECTION at Fr.No: ',
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm2i[0].thirdFrameNoTM2}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
            ]
          : [],
        [
          {
            style: 'txt_center',
            text: 'STRAKE POSITION',
            rowSpan: 2,
          },
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: ['txt_center', 'fontS8'], text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm  ', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: '    Diminution S  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: ['txt_center', 'fontS8'], text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
        ],
        [
          {},
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
        ],
      ],
    };

    // var tableTm3 = tableTm3_template;
    var tableTm3 = {
      headerRows: 9,
      widths: [
        // '2.2%',
        '22.4%',
        //2
        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //10
        '2.9%',
        '1.5%', //13
        '2.2%',

        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '1.5%', //20
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //23

        '2.6%',
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '1.5%', //
        '2.9%',
        '2.2%',
        '1.5%', //
      ],
      body: [
        //Table header
        this.lsFormTm3.length >= 1
          ? [
              {
                text: `TM3-${this.lsFormTm3[0].code}(1 July 2023)`,
                //   text: `TM2ii-${this.typeForm}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 34,
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
            ]
          : [],
        [
          {
            text: '',
            colSpan: 34,
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
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
            style: ['txt_center', 'fontS11'],
            colSpan: 34,
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
            colSpan: 34,
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
        this.lsFormTm3.length >= 1
          ? [
              {
                text: "Ship's name:",

                alignment: 'center' as Alignment,

                colSpan: 3,
                border: [false, false, false, false],
              },
              {},
              {},
              {
                decoration: 'underline' as Decoration,
                text: `${this.inShipName}`,
                colSpan: 8,
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
              {
                text: 'Class Identity No. ',
                colSpan: 4,
                border: [false, false, false, false],
              },
              {},
              {},
              {},
              {
                decoration: 'underline' as Decoration,
                text: `${this.inABS}`,
                colSpan: 8,
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

              {
                text: 'Report No. ',
                colSpan: 3,
                border: [false, false, false, false],
              },
              {},
              {},
              {
                decoration: 'underline' as Decoration,
                text: `${this.generalParticular[0].reportNo}`,

                colSpan: 8,
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
            ]
          : [],
        [
          {
            colSpan: 34,
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

        this.lsFormTm3.length >= 1
          ? [
              {
                style: 'txt_center',
                text: '',
              },
              {
                style: 'txt_center',
                text: `1st TRANSVERSE SECTION at Fr.No:`,
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: ` ${this.lsFormTm3[0].firstFrameNo}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                style: 'txt_center',
                text: `2nd TRANSVERSE SECTION at Fr.No: `,
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm3[0].secondFrameNo}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
              {
                style: 'txt_center',
                text: `1st TRANSVERSE SECTION at Fr.No: `,
                colSpan: 8,
                border: [true, true, false, true],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: `${this.lsFormTm3[0].thirdFrameNo}`,
                border: [false, true, true, true],
                colSpan: 3,
                bold: true,
              },
              {},
              {},
            ]
          : [],
        [
          {
            style: 'txt_center',
            text: 'STRAKE POSITION',
            rowSpan: 2,
          },
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm  ', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: '    Diminution S  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
        ],
        [
          {},
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
        ],
        ...(this.lsFormTm3.length >= 1
          ? this.lsFormTm3[0].measurementTM3DTOList!.map((x) => [
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.structuralMember,
              x.noOrLetter,
              x.firstTransverseSectionMeasurementDetail.originalThickness,
              x.firstTransverseSectionMeasurementDetail.originalThickness,
              x.firstTransverseSectionMeasurementDetail.maxAlwbDim,
              x.firstTransverseSectionMeasurementDetail.gaugedP,
              x.firstTransverseSectionMeasurementDetail.gaugedS,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.firstTransverseSectionMeasurementDetail.originalThickness,
              x.firstTransverseSectionMeasurementDetail.originalThickness,
              x.firstTransverseSectionMeasurementDetail.maxAlwbDim,
              x.firstTransverseSectionMeasurementDetail.gaugedP,
              x.firstTransverseSectionMeasurementDetail.gaugedS,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.noOrLetter,
              x.firstTransverseSectionMeasurementDetail.originalThickness,
              x.firstTransverseSectionMeasurementDetail.originalThickness,
              x.firstTransverseSectionMeasurementDetail.maxAlwbDim,
              x.firstTransverseSectionMeasurementDetail.gaugedP,
              x.firstTransverseSectionMeasurementDetail.gaugedS,
            ])
          : []),
      ],
    };

    // var tableTm4 = tableTm4_template;
    var tableTm4 = {
      headerRows: 10,
      widths: [
        // '5%',
        '30%',
        '7%',
        '10%',
        '13%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
      ],
      body: [
        //Table header
        this.lsFormTm4.length >= 1
          ? [
              {
                text: `TM4-${this.lsFormTm4[0].code}(1 July 2023)`,
                //   text: `TM4-${this.typeForm}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 12,
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
            ]
          : [],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF TRANSVERSE STRUCTURAL MEMBERS in the cargo oil and water ballast tanks within the cargo tank length',
            style: ['txt_center', 'fontS11'],
            colSpan: 12,
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
        ],
        [
          {
            colSpan: 12,
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
        ],
        [
          {
            text: "Ship's name:",
            alignment: 'center' as Alignment,
            colSpan: 1,
            border: [false, false, false, false],
          },
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {
            text: 'Class Identity No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},

          {
            text: 'Report No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.generalParticular[0].reportNo}`,
            colSpan: 3,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {},
        ],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        //Table content
        [
          {
            text: 'TANK DESCRIPTION:',
            alignment: 'left' as Alignment,
            colSpan: 1,
            style: 'txt_center',
          },
          {
            text: `${this.lsFormTm4[0].tankHolDescription}`,
            colSpan: 11,
            rowSpan: 1,
            bold: true,
          },
          'Price',
          'Date',
          'Image',
          'isEdited',
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        this.lsFormTm4.length >= 1
          ? [
              {
                text: 'LOCATION OF STRUCTURE:',
                alignment: 'left' as Alignment,
                colSpan: 1,
                style: ['txt_center', 'txt_center'],
              },
              {
                text: `${this.lsFormTm4[0].locationOfStructure}`,
                colSpan: 11,
                bold: true,
              },
              'Price',
              'Date',
              'Image',
              'isEdited',
              {},
              {},
              {},
              {},
              {},
              {},
            ]
          : [],
        [
          {
            text: 'STRUCTURAL MEMBER',
            rowSpan: 2,
            style: 'txt_center',
          },
          { text: 'Item', rowSpan: 2, style: 'txt_center' },

          { text: 'Original Thickness(mm)', rowSpan: 2, style: 'txt_center' },
          {
            text: 'Maximum Allowable Dim(mm)',
            rowSpan: 2,
            style: ['txt_center'],
          },
          { text: 'Gauged', colSpan: 2, style: 'txt_center' },
          {},
          { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
          {},
          {},
          { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
          {},
          {},
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
        ],
        ...(this.lsFormTm4.length >= 1 &&
        this.lsFormTm4[0].structuralMemberTM4List[0].structuralMemberTitle != ''
          ? [
              [
                {
                  text: `${this.lsFormTm4[0].structuralMemberTM4List[0].structuralMemberTitle}`,
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
              ],
              ...this.lsFormTm4[0].structuralMemberTM4List[0].measurementTM4DTOList!.map(
                (x) => [
                  this.no++,
                  // x.structuralMemberTitle,
                  x.structuralMember,
                  x.item,
                  x.detailMeasurement.originalThickness,
                  x.detailMeasurement.maxAlwbDim,
                  x.detailMeasurement.gaugedP,
                  x.detailMeasurement.gaugedS,
                  x.structuralMember,
                  x.structuralMember,
                  x.structuralMember,
                  x.structuralMember,
                  x.structuralMember,
                ]
              ),
            ]
          : []),

        ...(this.lsFormTm4.length >= 1 &&
        this.lsFormTm4[0].structuralMemberTM4List.length >= 2 &&
        this.lsFormTm4[0].structuralMemberTM4List[1].structuralMemberTitle != ''
          ? [
              [
                {
                  text: `${this.lsFormTm4[0].structuralMemberTM4List[1].structuralMemberTitle}`,
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
              ],
              ...this.lsFormTm4[0].structuralMemberTM4List[1].measurementTM4DTOList!.map(
                (x) => [
                  this.no++,
                  // x.structuralMemberTitle,
                  x.structuralMember,
                  x.item,
                  x.detailMeasurement.originalThickness,
                  x.detailMeasurement.maxAlwbDim,
                  x.detailMeasurement.gaugedP,
                  x.detailMeasurement.gaugedS,
                  x.structuralMember,
                  x.structuralMember,
                  x.structuralMember,
                  x.structuralMember,
                  x.structuralMember,
                ]
              ),
            ]
          : []),

        // ...(this.lsFormTm4.length >= 1
        //   ? this.lsFormTm4[0].structuralMemberTM4List[0].measurementTM4DTOList!.map(
        //       (x) => [
        //         { text: this.no++ },
        //         // x.structuralMemberTitle,
        //         x.structuralMember,
        //         x.item,
        //         x.detailMeasurement.originalThickness,
        //         x.detailMeasurement.maxAlwbDim,
        //         x.detailMeasurement.gaugedP,
        //         x.detailMeasurement.gaugedS,
        //         x.structuralMember,
        //         x.structuralMember,
        //         x.structuralMember,
        //         x.structuralMember,
        //         x.structuralMember,
        //         x.structuralMember,
        //       ]
        //     )
        //   : []),
      ],
    };
    var tableTm4_c = {
      headerRows: 10,
      widths: [
        // '5%',
        '30%',
        '7%',
        '10%',
        '13%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
      ],
      body: [
        //Table header
        this.lsFormTm4.length >= 2
          ? [
              {
                text: `TM4-${this.lsFormTm4[0].code}(1 July 2023)`,
                //   text: `TM4-${this.typeForm}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 12,
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
            ]
          : [],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF TRANSVERSE STRUCTURAL MEMBERS in the cargo oil and water ballast tanks within the cargo tank length',
            style: ['txt_center', 'fontS11'],
            colSpan: 12,
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
        ],
        [
          {
            colSpan: 12,
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
        ],
        [
          {
            text: "Ship's name:",
            alignment: 'center' as Alignment,
            colSpan: 1,
            border: [false, false, false, false],
          },
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {
            text: 'Class Identity No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},

          {
            text: 'Report No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.generalParticular[0].reportNo}`,
            colSpan: 3,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {},
        ],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        //Table content
        [
          {
            text: 'TANK DESCRIPTION:',
            alignment: 'left' as Alignment,
            colSpan: 1,
            style: 'txt_center',
          },
          { text: 'a', colSpan: 11, rowSpan: 1, bold: true },
          'Price',
          'Date',
          'Image',
          'isEdited',
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        [
          {
            text: 'LOCATION OF STRUCTURE:',
            alignment: 'left' as Alignment,
            colSpan: 1,
            style: ['txt_center', 'txt_center'],
          },
          {
            text: 'a',
            colSpan: 11,
            bold: true,
          },
          'Price',
          'Date',
          'Image',
          'isEdited',
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        [
          {
            text: 'STRUCTURAL MEMBER',
            rowSpan: 2,
            style: 'txt_center',
          },
          { text: 'Item', rowSpan: 2, style: 'txt_center' },

          { text: 'Original Thickness(mm)', rowSpan: 2, style: 'txt_center' },
          {
            text: 'Maximum Allowable Dim(mm)',
            rowSpan: 2,
            style: ['txt_center'],
          },
          { text: 'Gauged', colSpan: 2, style: 'txt_center' },
          {},
          { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
          {},
          {},
          { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
          {},
          {},
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
        ],
        ...(this.lsFormTm4.length >= 2
          ? this.lsFormTm4[1].structuralMemberTM4List[0].measurementTM4DTOList!.map(
              (x) => [
                this.no++,
                // x.structuralMemberTitle,
                x.structuralMember,
                x.item,
                x.detailMeasurement.originalThickness,
                x.detailMeasurement.maxAlwbDim,
                x.detailMeasurement.gaugedP,
                x.detailMeasurement.gaugedS,
                x.structuralMember,
                x.structuralMember,
                x.structuralMember,
                x.structuralMember,
                x.structuralMember,
              ]
            )
          : []),
      ],
    };

    // var tableTm5 = tableTm5_template;
    var tableTm5 = {
      headerRows: 10,
      widths: [
        '30%',
        '25%',
        '7%',
        '10%',
        '13%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
      ],
      body: [
        //Table header
        this.lsFormTm5.length >= 1
          ? [
              {
                text: `TM5-${this.lsFormTm5[0].code}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 12,
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
            ]
          : [],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF W.T./O.T. TRANSVERSE BULKHEADS within the cargo tank or cargo hold spaces',
            style: ['txt_center', 'fontS11'],
            colSpan: 12,
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
        ],
        [
          {
            colSpan: 12,
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
        ],
        [
          {
            text: "Ship's name:",

            alignment: 'center' as Alignment,

            colSpan: 1,
            border: [false, false, false, false],
          },
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {
            text: 'Class Identity No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},

          {
            text: 'Report No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.generalParticular[0].reportNo}`,
            colSpan: 3,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {},
        ],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        [
          {
            alignment: 'left' as Alignment,

            text: 'TANK/HOLD DESCRIPTION:',
            colSpan: 1,
            style: 'txt_center',
          },
          { text: 'a', colSpan: 11, rowSpan: 1, bold: true },
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
            text: 'LOCATION OF STRUCTURE:',
            alignment: 'left' as Alignment,

            colSpan: 1,
            style: ['txt_center', 'txt_center'],
          },
          {
            text: 'a',
            colSpan: 6,
            bold: true,
          },
          {},
          {},
          {},
          {},
          {},
          {
            text: 'Frame No. :',
            alignment: 'center' as Alignment,
            border: [false, false, false, false],
            colSpan: 2,
          },
          {},
          {
            text: '42',
            border: [false, false, true, false],
            colSpan: 3,
            bold: true,
          },
          {},
          {},
        ],
        [
          {
            text: 'STRUCTURAL COMPONENT (PLATING/STIFFENER)',
            rowSpan: 2,
            style: 'txt_center',
          },
          { text: 'Item', rowSpan: 2, style: 'txt_center' },

          { text: 'Original Thickness(mm)', rowSpan: 2, style: 'txt_center' },
          {
            text: 'Maximum Allowable Dim(mm)',
            rowSpan: 2,
            style: 'txt_center',
          },
          { text: 'Gauged', colSpan: 2, style: 'txt_center' },
          {},
          { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
          {},
          {},
          { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
          {},
          {},
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
        ],
        ...(this.lsFormTm5.length >= 1
          ? this.lsFormTm5[0].measurementTM5List!.map((x) => [
              x.measurementDetail.gaugedP,
              x.structuralComponent,
              x.measurementDetail.gaugedP,
              x.measurementDetail.originalThickness,
              x.measurementDetail.maxAlwbDim,
              x.measurementDetail.gaugedP,
              x.measurementDetail.gaugedP,
              x.measurementDetail.gaugedP,
              x.measurementDetail.gaugedP,
              x.measurementDetail.gaugedP,
              x.measurementDetail.gaugedP,
              x.measurementDetail.gaugedP,
            ])
          : []),
      ],
    };
    // var tableTm6 = tableTm6_template;
    var tableTm6 = {
      headerRows: 10,
      widths: [
        // '5%',
        '30%',
        '10%',
        '10%',
        '10%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
        '5%',
      ],
      body: [
        //Table header
        this.lsFormTm6.length >= 1
          ? [
              {
                text: `TM6-${this.lsFormTm6[0].code}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 12,
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
            ]
          : [],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        //Table name

        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF MISCELLANEOUS STRUCTURAL MEMBERS',
            style: ['txt_center', 'fontS11'],
            colSpan: 12,
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
        ],
        [
          {
            colSpan: 12,
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
        ],
        [
          {
            text: "Ship's name:",

            alignment: 'center' as Alignment,
            colSpan: 1,
            border: [false, false, false, false],
          },
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {
            text: 'Class Identity No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 2,
            bold: true,
            border: [false, false, false, false],
          },
          {},

          {
            text: 'Report No. ',
            colSpan: 2,
            border: [false, false, false, false],
          },
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.generalParticular[0].reportNo}`,
            colSpan: 3,
            bold: true,
            border: [false, false, false, false],
          },
          {},
          {},
        ],
        [
          {
            text: '',
            colSpan: 12,
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
        ],
        //Table content
        [
          {
            text: 'STRUCTURAL MEMBERS :',
            alignment: 'left' as Alignment,
            colSpan: 1,
            style: 'txt_center',
          },
          { text: 'a', colSpan: 11, rowSpan: 1, bold: true },
          'Price',
          'Date',
          'Image',
          'isEdited',
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        [
          {
            text: 'LOCATION OF STRUCTURE:',
            alignment: 'left' as Alignment,
            colSpan: 1,
            style: ['txt_center', 'txt_center'],
          },
          {
            text: 'a',
            colSpan: 11,
            bold: true,
          },
          'Price',
          'Date',
          'Image',
          'isEdited',
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        [
          {
            text: 'Description',
            rowSpan: 2,
            style: 'txt_center',
          },
          { text: 'Item', rowSpan: 2, style: 'txt_center' },

          { text: 'Original Thickness(mm)', rowSpan: 2, style: 'txt_center' },
          {
            text: 'Maximum Allowable Dim(mm)',
            rowSpan: 2,
            style: 'txt_center',
          },
          { text: 'Gauged', colSpan: 2, style: 'txt_center' },
          {},
          { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
          {},
          {},
          { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
          {},
          {},
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
        ],
        ...(this.lsFormTm6.length >= 1
          ? this.lsFormTm6[0].structuralDescriptionTM6List[0].measurementTM6DTOList!.map(
              (x) => [
                (this.no = 1),
                // x.structuralDescriptionTitle,
                x.description,
                x.item,
                x.detailMeasurement.originalThickness,
                x.detailMeasurement.maxAlwbDim,
                x.detailMeasurement.gaugedP,
                x.detailMeasurement.gaugedS,
                x.detailMeasurement.gaugedS,
                x.detailMeasurement.gaugedS,
                x.detailMeasurement.gaugedS,
                x.detailMeasurement.gaugedS,
                x.detailMeasurement.gaugedS,
              ],
              this.no++
            )
          : []),
      ],
    };
    // var tableTm7 = tableTm7_template;
    var tableTm7 = {
      headerRows: 10,
      widths: [
        // '2.2%',
        '25.6%',
        //2
        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '2.2%',

        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '2.2%',

        '2.9%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '2.2%',
        '2.9%',
        '2.2%',
        '2.2%',
      ],
      body: [
        //Table header
        this.lsFormTm7.length >= 1
          ? [
              {
                text: `TM7-${this.lsFormTm7[0].code}(1 July 2023)`,
                style: ['txt_center'],
                colSpan: 31,
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
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ]
          : [],
        [
          {
            text: '',
            colSpan: 31,
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
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        // Table content
        [
          {
            text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
            style: ['txt_center', 'fontS11'],
            colSpan: 31,
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
            colSpan: 31,
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

            colSpan: 3,
            border: [false, false, false, false],
          },
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inShipName}`,
            colSpan: 8,
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
          {
            text: 'Class Identity No. ',
            colSpan: 4,
            border: [false, false, false, false],
          },
          {},
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.inABS}`,
            colSpan: 8,
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

          {
            text: 'Report No. ',
            colSpan: 3,
            border: [false, false, false, false],
          },
          {},
          {},
          {
            decoration: 'underline' as Decoration,
            text: `${this.generalParticular[0].reportNo}`,
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
            colSpan: 31,
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
            text: 'CARGO HOLD NO. 1',
            colSpan: 31,
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
            text: '',
            colSpan: 1,
          },
          {
            style: 'txt_center',
            text: 'UPPER PART',
            colSpan: 10,
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
          {
            style: 'txt_center',
            text: 'MID PART',
            colSpan: 10,
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
          {
            style: 'txt_center',
            text: 'LOWER PART',
            colSpan: 10,
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
        ],
        [
          {
            style: 'txt_center',
            text: 'FRAME NUMBER',
            rowSpan: 2,
          },
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm  ', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: '    Diminution S  ', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Org.Thk.' },
          { style: 'txt_center', text: 'Max.Alwb.Dim' },
          { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
          {},
          {},
          { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
          {},
          {},
        ],
        [
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},

          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: 'P' },
          { style: 'txt_center', text: 'S' },
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
          { style: 'txt_center', text: 'mm' },
          { style: 'txt_center', text: '%', colSpan: 2 },
          {},
        ],
        ...(this.lsFormTm7.length >= 1
          ? this.lsFormTm7[0].frameNumberList[0].measurementTM7DTOList!.map(
              (x) => [
                this.no++,
                // x.structuralMemberTitle,
                x.upperPart.originalThickness,
                x.upperPart.originalThickness,
                x.upperPart.maxAlwbDim,
                x.upperPart.gaugedP,
                x.upperPart.gaugedS,

                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,

                x.upperPart.originalThickness,
                x.upperPart.maxAlwbDim,
                x.upperPart.gaugedP,
                x.upperPart.gaugedS,

                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,

                x.upperPart.originalThickness,
                x.upperPart.maxAlwbDim,
                x.upperPart.gaugedP,
                x.upperPart.gaugedS,

                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
                x.upperPart.gaugedS,
              ]
            )
          : []),
      ],
    };

    */
    // Define pdfDocument
    var pdfDocument = {
      footer: function (currentPage: any, pageCount: any) {
        (_pageCount = pageCount.toString()),
          // this.pageNumber = pageCount.toString(),
          console.log('This is pg:' + _pageCount);

        if (currentPage == 4)
          return {
            columns: [
              {
                text: '',
              },
            ],
          };
        return {
          columns: [
            ...((this as any)?.hasImage == true
              ? [{ text: 'dsad', alignment: 'left' as Alignment }]
              : [
                  {
                    alignment: 'left' as Alignment,
                    text: "Operator's signature:.................",
                  },
                ]),

            // this.a==true ? [{ table:  table  }] : [{table:  table1 }],
            checkSignature == true
              ? [
                  {
                    alignment: 'center' as Alignment,
                    text: "Surveyor's signature:.................",
                  },
                ]
              : [],
            [
              {
                alignment: 'right' as Alignment,
                style: 'txt_center',
                text: 'R: Renewed; S: Substantial corrosion ',
              },
              {
                alignment: 'right' as Alignment,
                text: 'Page: ' + currentPage.toString(),
              },
            ],
          ],
          columnGap: 25,
          style: ['txt_center', 'footer'],
        };
      },
      pageOrientation: 'portrait' as PageOrientation,
      pageSize: 'A4' as PageSize,
      content: [
        [
          {
            table: {
              body: [
                [
                  {
                    image: 'logo',
                    border: [false, false, false, false],
                    width: 50,
                  },
                  {
                    text: 'VIET NAM MARINE INDUSTRY AND SERVICE JOINT STOCK COMPANY',
                    border: [false, false, false, false],
                    style: ['txt_center', 'fontS13', { color: 'blue' }],
                    margin: [0, 20, 0, 0],
                  },
                ],
              ],
            },
          },
          // {
          //   style: ['txt_center', 'fontS15', { color: 'blue' }],
          //   text: 'VIET NAM MARINE INDUSTRY AND SERVICE JOINT STOCK COMPANY',
          // },
          {
            image:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxoAAAAOCAIAAAAnjf0VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAENSURBVHhe7dvNbcJAEAZQisjRNVCGO6CaVOAiIq6UQEVIGIFQbJD4sxmxTnAkpFj4+t7JszO73uN3sCftMJfL5fvhcDh0Sz+apkmt4/GYVuIhTUYryvP5nAau12uUt9utqqooT6fTY7xNZV3XqUxib5yw3W5Xq9Vut4tubOx6f6UD1+v1ZrOJsfTSl+ICMVmWZZy53+9/LwAA8LahcQoAgJfEKQCAUZ5xarFYfAEAMMByuewiVD9OZVk2AQBggDzPuwjVj1Ppe3AAAP7V/znvGaeKovgEAGCA+XzeRah+nJpOpx8AAAwwm826CNWPUwAAvEGcAgAYRZwCABhFnAIAGEWcAgAYRZwCABihbe+0IVULvJUf+gAAAABJRU5ErkJggg==',
            width: 500,
          },
          // {
          //   table: {
          //     widths: ['*'],
          //     body: [
          //       [
          //         {
          //           border: [false, false, false, true],
          //           text: '',
          //           margin: [0, 0, 0, 5], // Khoảng cách giữa đường kẻ và văn bản
          //         },
          //       ],
          //     ],
          //   },
          // },
          {
            text: 'ULTRASONIC THICKNESS MEASUREMENT REPORT',
            bold: true,
            style: ['txt_center', 'mg_t', 'fontS15'],
          },
          {
            text: `${this.generalParticular[0].surveyType}`,
            bold: true,
            style: ['txt_center', 'fontS15', { color: 'blue' }],
          },
          {
            text: `SHIP'S NAME: `,
            style: ['txt_center', 'mg_25', 'fontS18'],
          },
          {
            table: {
              body: [
                [
                  {
                    text: `${this.inShipName}`,
                    style: ['fontS30'],
                  },
                ],
              ],
            },
            style: ['shipNameGeneral'],
            // text: `${this.inShipName}`,
            // style: ['txt_center', 'fontS30'],
          },
          {
            columns: [
              {
                text: 'IMO No.:',
                style: ['mg_25'],
              },
              {
                text: `${this.inIMO}`,
                decoration: 'underline' as Decoration,
                style: ['mg_25'],
                bold: true,
              },
            ],
            style: ['fontS18', 'mg_l_90'],
          },
          {
            style: ['fontS18', 'mg_l_90'],
            columns: [
              {
                text: 'CLASS ID.: ',
              },
              {
                text: `${this.inABS}`,
                decoration: 'underline' as Decoration,
                bold: true,
              },
            ],
          },
          {
            columns: [
              {
                text: 'REPORT No.: ',
              },
              {
                text: `VMC.UTM/12/12/32 `,
                decoration: 'underline' as Decoration,
                bold: true,
              },
            ],
            style: ['fontS18', 'mg_l_90'],
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    border: [false, false, false, true],
                    text: '',
                    margin: [0, 200, 0, 0], // Khoảng cách giữa đường kẻ và văn bản
                    style: ['mg_25'],
                  },
                ],
              ],
            },
          },
        ],
        [
          {
            pageBreak: 'before' as PageBreak,
            text: 'GENERAL PARTICULAR',
            style: ['header', 'fontS18', 'txt_center'],
            bold: true,
          },
          {
            columns: [
              {
                text: "Ship's name: ",
              },
              {
                text: `${this.inShipName}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'IMO number: ',
              },
              {
                text: `${this.inIMO}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'ABS identification number: ',
              },
              {
                text: `${this.inCertificateNo}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Port of registry : ',
              },
              {
                text: `${this.inPortOf}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Gross tons : ',
              },
              {
                text: `${this.inGrossTon}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Deadweight : ',
              },
              {
                text: `${this.inDeadWeith}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Date of build : ',
              },
              {
                text: `${this.inDateBuild}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Classification society : ',
              },
              {
                text: `${this.inClassi}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    border: [false, false, false, true],
                    text: '',
                    margin: [0, 5, 0, 5], // Khoảng cách giữa đường kẻ và văn bản
                  },
                ],
              ],
            },
          },
          {
            text: 'Name of company performing thickness measurement :',
            margin: [0, 10, 0, 10] as Margins,
          },
          {
            text: 'VIET NAM MARINE INDUSTRY AND SERVICE JOINT STOCK COMPANY ',
            bold: true,
            style: ['txt_center', 'fontS11'],
          },
          {
            columns: [
              {
                text: 'Thickness measurement company certified by :',
              },
              {
                text: `${this.generalParticular[0].certificateDTO.certificateOrganization}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Certificate No. ',
              },
              {
                text: `${this.generalParticular[0].certificateDTO.certificateNo}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Certificate valid from ',
              },
              {
                decoration: 'underline' as Decoration,
                text: `${this.generalParticular[0].certificateDTO.validStartDate} to ${this.generalParticular[0].certificateDTO.validEndDate}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Place of measurement : ',
              },
              {
                text: `${this.generalParticular[0].placeOfMeasurement}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Firt date of measurement : ',
              },
              {
                text: `${this.generalParticular[0].firstDateOfMeasurement}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Last date of measurement : ',
              },
              {
                text: `${this.generalParticular[0].lastDateOfMeasurement}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Special survey / Intermediate survey due: ',
              },
              {
                text: `${this.generalParticular[0].surveyType}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Details of measurement equipment : ',
              },
              {
                text: `${this.generalParticular[0].measurementEquipmentInfo}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Qualification of operator : ',
              },
              {
                text: `${this.inParam_qualification}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    border: [false, false, false, true],
                    text: '',
                    margin: [0, 5, 0, 5],
                  },
                ],
              ],
            },
          },
          {
            columns: [
              {
                text: `Report Number : `,
              },
              {
                text: ` ${this.generalParticular[0].reportNo}`,
                bold: true,
              },
              {
                text: `consisting of :  Sheets`,
              },
            ],
            style: ['mg_t'],
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    border: [false, false, false, true],
                    text: '',
                    margin: [0, 5, 0, 5], // Khoảng cách giữa đường kẻ và văn bản
                  },
                ],
              ],
            },
          },
          {
            columns: [
              {
                text: 'Name of operator : ',
              },
              {
                text: `${this.inOperatorName}`,
                bold: true,
              },
              {
                text: 'Name of suveyor : ',
              },
              {
                text: `${this.generalParticular[0].surveyorInfo}`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Signature of operator : ',
              },
              {
                text: `...........................`,
                bold: true,
              },
              {
                text: 'Signature of suveyor : ',
              },
              {
                text: `...........................`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
          {
            columns: [
              {
                text: 'Company official stamp :',
              },
              {
                text: `...........................`,
                bold: true,
              },
              {
                text: 'Classification Society official stamp : ',
              },
              {
                text: `...........................`,
                bold: true,
              },
            ],
            style: ['mg_t'],
          },
        ],

        //Table of Content
        [
          {
            text: 'THICKNESS MEASUREMENT REPORT INDEX',
            style: ['header', 'txt_center', 'fontS18'],
            bold: true,
            pageBreak: 'before' as PageBreak,
          },
          {
            columns: [
              {
                style: ['mg_l_90', 'fontS11'],
                text: "Ship's name: ",
              },
              {
                text: `${this.inShipName}`,
                bold: true,
                decoration: 'underline' as Decoration,
              },
            ],
            style: ['mg_t_8'],
          },
          {
            columns: [
              {
                style: ['mg_l_90', 'fontS11'],
                text: 'IMO No.:',
              },
              {
                text: `${this.inIMO}`,
                decoration: 'underline' as Decoration,
                bold: true,
              },
            ],
            style: ['mg_t_8'],
          },
          {
            columns: [
              {
                style: ['mg_l_90', 'fontS11'],
                text: 'CLASS ID.:',
              },
              {
                text: `${this.inABS}`,
                decoration: 'underline' as Decoration,
                bold: true,
              },
            ],
            style: ['mg_t_8'],
          },
          {
            columns: [
              {
                text: 'REPORT No.: ',
                style: ['mg_l_90', 'fontS11'],
              },
              {
                text: `${this.inReport}`,
                decoration: 'underline' as Decoration,
                bold: true,
              },
            ],
            style: ['mg_t_8'],
          },
          {
            columns: [
              {
                style: ['mg_l_90', 'fontS11'],
                text: 'TYPE OF SURVEY: ',
              },
              {
                decoration: 'underline' as Decoration,
                text: `${this.generalParticular[0].surveyType}`,
                bold: true,
              },
            ],
            style: ['mg_t_8'],
            // columnGap: -100,
          },
          { table: tableOfContent, style: ['mg_t_8', 'fontS11'] },
        ],
        // pageTitle
        [
          this.data_part.map((x: any) => [
            [
              {
                pageBreak: 'before' as PageBreak,
                decoration: 'underline' as Decoration,
                pageOrientation: 'portrait' as PageOrientation,
                alignment: 'center' as Alignment,
                style: ['fontS11', 'mg_50'],
                text: `${x.partIndex}`,
                bold: true,
              },
              {
                decoration: 'underline' as Decoration,
                text: `${x.item}`,
                alignment: 'center' as Alignment,
                style: ['fontS45'],
                bold: true,
              },
            ],
            //tm1
            x.formList.map((y: any) =>
              y.type == 'TM1'
                ? [
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        //23 rows
                        widths: [
                          // '4%',
                          '38.5%',
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
                              text: `TM1`,
                              //   text: `TM1-${this.typeForm}(1 July 2023)`,
                              style: ['txt_center'],
                              colSpan: 22,
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
                          ],
                          [
                            {
                              text: '',
                              colSpan: 22,
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
                          ],
                          // table info
                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT of ALL DECK PLATING, ALL BOTTOM SHELL PLATING or SIDE SHELL PLATING',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 22,
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
                          ],
                          [
                            {
                              colSpan: 22,
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
                          ],
                          [
                            {
                              text: "Ship's name:",
                              alignment: 'center' as Alignment,
                              // colSpan: 2,
                              border: [false, false, false, false],
                            },
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inShipName}`,
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
                              text: `${this.inABS}`,
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
                              text: `${this.generalParticular[0].reportNo}`,
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
                              colSpan: 22,
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
                          ],
                          // table content
                          [
                            {
                              text: 'STRAKE POSITION',
                              alignment: 'left' as Alignment,
                              style: 'txt_center',
                            },
                            {
                              text: `${y.strakePosition}`,
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
                              text: 'PLATE POSITION',
                              rowSpan: 3,
                            },
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 3,
                            },
                            {
                              style: 'txt_center',
                              text: 'Org.Thk.',
                              rowSpan: 3,
                            },
                            {
                              style: 'txt_center',
                              text: 'Forward Reading',
                              colSpan: 8,
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},

                            {
                              style: 'txt_center',
                              text: 'Aft Reading',
                              colSpan: 8,
                            },
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

                            {
                              style: 'txt_center',
                              text: 'Max Alwb Dim',
                              rowSpan: 2,
                            },
                          ],
                          [
                            {},
                            {},
                            {},
                            {
                              text: 'Gauged mm',
                              colSpan: 2,
                              style: 'txt_center',
                            },
                            {},
                            {
                              text: 'Diminution P',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},
                            {
                              text: 'Diminution S',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},

                            {
                              text: 'Gauged (mm)',
                              colSpan: 2,
                              style: 'txt_center',
                            },
                            {},
                            {
                              text: 'Diminution P',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},
                            {
                              text: 'Diminution S',
                              colSpan: 3,
                              style: 'txt_center',
                            },
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

                          ...y.measurementTM1DTOList?.map((z: any) => [
                            z.platePosition,
                            z.noOrLetter,
                            z.noOrLetter,

                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,
                            z.forwardReadingMeasurementDetail.gaugedP,

                            z.afterReadingMeasurementDetail.gaugedP,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.afterReadingMeasurementDetail.gaugedS,
                            z.noOrLetter,
                            z.noOrLetter,
                            z.noOrLetter,
                          ]),
                        ],
                      },
                    },
                  ]
                : []
            ),
            //tm2i
            x.formList.map((y: any) =>
              y.type == 'TM2(I)'
                ? [
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          // '2.2%',
                          '22.4%',
                          //2
                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //10
                          '2.9%',
                          '1.5%', //13
                          '2.2%',

                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '1.5%', //20
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //23

                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //
                          '2.9%',
                          '2.2%',
                          '1.5%', //
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM2i-${y.code}(1 July 2023)`,
                              style: ['txt_center'],
                              colSpan: 34,
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
                              colSpan: 34,
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
                          // Table content
                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 34,
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
                              colSpan: 34,
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

                              colSpan: 3,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inShipName}`,
                              colSpan: 8,
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
                            {
                              text: 'Class Identity No. ',
                              colSpan: 4,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inABS}`,
                              colSpan: 8,
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

                            {
                              text: 'Report No. ',
                              colSpan: 3,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.generalParticular[0].reportNo}`,
                              colSpan: 8,
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
                          ],
                          [
                            {
                              colSpan: 34,
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
                              text: 'STRENGTH DECK AND SHEER STRAKE PLATING',
                              colSpan: 34,
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
                            {},
                            {
                              style: 'txt_center',
                              text: '1st TRANSVERSE SECTION at Fr.No: ',
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.firstFrameNoTM2}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '2nd TRANSVERSE SECTION at Fr.No: ',
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.secondFrameNoTM2}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '3rd TRANSVERSE SECTION at Fr.No: ',
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.thirdFrameNoTM2}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                          ],
                          [
                            {
                              style: 'txt_center',
                              text: 'STRAKE POSITION',
                              rowSpan: 2,
                            },
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm  ',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P  ',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '    Diminution S  ',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution S',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution S',
                              colSpan: 3,
                            },
                            {},
                            {},
                          ],
                          [
                            {},
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            {},

                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            {},

                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                          ],
                          ...y.measurementTM2DTOList?.map((z: any) => [
                            z.strakePosition,
                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedP,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,

                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedP,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,

                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedP,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                          ]),
                        ],
                      },
                    },
                  ]
                : []
            ),
            //tm2ii
            x.formList.map((y: any) =>
              y.type == 'TM2(II)'
                ? [
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          // '2.2%',
                          '22.4%',
                          //2
                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //10
                          '2.9%',
                          '1.5%', //13
                          '2.2%',

                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '1.5%', //20
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //23

                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //
                          '2.9%',
                          '2.2%',
                          '1.5%', //
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM2ii-${y.code}(1 July 2023)`,
                              style: ['txt_center'],
                              colSpan: 34,
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
                              colSpan: 34,
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
                          // Table content
                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 34,
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
                              colSpan: 34,
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

                              colSpan: 3,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inShipName}`,
                              colSpan: 8,
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
                            {
                              text: 'Class Identity No. ',
                              colSpan: 4,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inABS}`,
                              colSpan: 8,
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

                            {
                              text: 'Report No. ',
                              colSpan: 3,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.generalParticular[0].reportNo}`,
                              colSpan: 8,
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
                          ],
                          [
                            {
                              colSpan: 34,
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
                              text: 'SHELL PLATING',
                              colSpan: 34,
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
                            {},
                            {
                              style: 'txt_center',
                              text: '1st TRANSVERSE SECTION at Fr.No: ',
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.firstFrameNoTM2}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '2nd TRANSVERSE SECTION at Fr.No: ',
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.secondFrameNoTM2}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '3rd TRANSVERSE SECTION at Fr.No: ',
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.thirdFrameNoTM2}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                          ],
                          [
                            {
                              style: 'txt_center',
                              text: 'STRAKE POSITION',
                              rowSpan: 2,
                            },
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm  ',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P  ',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '    Diminution S  ',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution S',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution S',
                              colSpan: 3,
                            },
                            {},
                            {},
                          ],
                          [
                            {},
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            {},

                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            {},

                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                          ],
                          ...y.measurementTM2DTOList?.map((z: any) => [
                            z.strakePosition,
                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedP,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,

                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedP,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,

                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedP,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                            z.firstTransverseSectionMeasurementDetailTM2
                              .gaugedS,
                          ]),
                        ],
                      },
                    },
                  ]
                : []
            ),
            x.formList.map((y: any) =>
              y.type == 'TM3'
                ? [
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        widths: [
                          // '2.2%',
                          '22.4%',
                          //2
                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //10
                          '2.9%',
                          '1.5%', //13
                          '2.2%',

                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '1.5%', //20
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //23

                          '2.6%',
                          '2.9%',
                          '2.9%',
                          '2.2%',
                          '2.2%',
                          '2.9%',
                          '2.2%',
                          '1.5%', //
                          '2.9%',
                          '2.2%',
                          '1.5%', //
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM3-${y.code}(1 July 2023)`,
                              //   text: `TM2ii-${this.typeForm}(1 July 2023)`,
                              style: ['txt_center'],
                              colSpan: 34,
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
                              colSpan: 34,
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
                          // Table content
                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 34,
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
                              colSpan: 34,
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

                              colSpan: 3,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inShipName}`,
                              colSpan: 8,
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
                            {
                              text: 'Class Identity No. ',
                              colSpan: 4,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inABS}`,
                              colSpan: 8,
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

                            {
                              text: 'Report No. ',
                              colSpan: 3,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.generalParticular[0].reportNo}`,

                              colSpan: 8,
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
                          ],
                          [
                            {
                              colSpan: 34,
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
                              text: '',
                            },
                            {
                              style: 'txt_center',
                              text: `1st TRANSVERSE SECTION at Fr.No:`,
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: ` ${y.firstFrameNo}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: `2nd TRANSVERSE SECTION at Fr.No: `,
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.secondFrameNo}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: `1st TRANSVERSE SECTION at Fr.No: `,
                              colSpan: 8,
                              border: [true, true, false, true],
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: `${y.thirdFrameNo}`,
                              border: [false, true, true, true],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                          ],
                          [
                            {
                              style: 'txt_center',
                              text: 'STRAKE POSITION',
                              rowSpan: 2,
                            },
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm  ',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P  ',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: '    Diminution S  ',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution S',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'No. or Letter',
                              rowSpan: 2,
                            },
                            { style: 'txt_center', text: 'Org.Thk.' },
                            { style: 'txt_center', text: 'Max.Alwb.Dim' },
                            {
                              style: 'txt_center',
                              text: 'Gauged mm',
                              colSpan: 2,
                            },
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution P',
                              colSpan: 3,
                            },
                            {},
                            {},
                            {
                              style: 'txt_center',
                              text: 'Diminution S',
                              colSpan: 3,
                            },
                            {},
                            {},
                          ],
                          [
                            {},
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            {},

                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            {},

                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: 'P' },
                            { style: 'txt_center', text: 'S' },
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                            { style: 'txt_center', text: 'mm' },
                            { style: 'txt_center', text: '%', colSpan: 2 },
                            {},
                          ],
                          ...y.measurementTM3DTOList?.map((z: any) => [
                            z.structuralMember,
                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetail
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetail
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetail.gaugedP,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,

                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetail
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetail
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetail.gaugedP,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,

                            z.noOrLetter,
                            z.firstTransverseSectionMeasurementDetail
                              .originalThickness,
                            z.firstTransverseSectionMeasurementDetail
                              .maxAlwbDim,
                            z.firstTransverseSectionMeasurementDetail.gaugedP,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                            z.firstTransverseSectionMeasurementDetail.gaugedS,
                          ]),
                        ],
                      },
                    },
                  ]
                : []
            ),
            //TM4
            x.formList.map((y: any) =>
              y.type == 'TM4'
                ? [
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          // '5%',
                          '30%',
                          '7%',
                          '10%',
                          '13%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM4-${y.code}(1 July 2023)`,
                              //   text: `TM4-${this.typeForm}(1 July 2023)`,
                              style: ['txt_center'],
                              colSpan: 12,
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
                          ],
                          [
                            {
                              text: '',
                              colSpan: 12,
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
                          ],
                          // Table content
                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT OF TRANSVERSE STRUCTURAL MEMBERS in the cargo oil and water ballast tanks within the cargo tank length',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 12,
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
                          ],
                          [
                            {
                              colSpan: 12,
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
                          ],
                          [
                            {
                              text: "Ship's name:",
                              alignment: 'center' as Alignment,
                              colSpan: 1,
                              border: [false, false, false, false],
                            },
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inShipName}`,
                              colSpan: 2,
                              bold: true,
                              border: [false, false, false, false],
                            },
                            {},
                            {
                              text: 'Class Identity No. ',
                              colSpan: 2,
                              border: [false, false, false, false],
                            },
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inABS}`,
                              colSpan: 2,
                              bold: true,
                              border: [false, false, false, false],
                            },
                            {},

                            {
                              text: 'Report No. ',
                              colSpan: 2,
                              border: [false, false, false, false],
                            },
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.generalParticular[0].reportNo}`,
                              colSpan: 3,
                              bold: true,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                          ],
                          [
                            {
                              text: '',
                              colSpan: 12,
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
                          ],
                          //Table content
                          [
                            {
                              text: 'TANK DESCRIPTION:',
                              alignment: 'left' as Alignment,
                              colSpan: 1,
                              style: 'txt_center',
                            },
                            {
                              text: `${y.tankHolDescription}`,
                              colSpan: 11,
                              rowSpan: 1,
                              bold: true,
                            },
                            'Price',
                            'Date',
                            'Image',
                            'isEdited',
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                          ],
                          [
                            {
                              text: 'LOCATION OF STRUCTURE:',
                              alignment: 'left' as Alignment,
                              colSpan: 1,
                              style: ['txt_center', 'txt_center'],
                            },
                            {
                              text: `${y.locationOfStructure}`,
                              colSpan: 11,
                              bold: true,
                            },
                            'Price',
                            'Date',
                            'Image',
                            'isEdited',
                            {},
                            {},
                            {},
                            {},
                            {},
                            {},
                          ],
                          [
                            {
                              text: 'STRUCTURAL MEMBER',
                              rowSpan: 2,
                              style: 'txt_center',
                            },
                            { text: 'Item', rowSpan: 2, style: 'txt_center' },

                            {
                              text: 'Original Thickness(mm)',
                              rowSpan: 2,
                              style: 'txt_center',
                            },
                            {
                              text: 'Maximum Allowable Dim(mm)',
                              rowSpan: 2,
                              style: ['txt_center'],
                            },
                            { text: 'Gauged', colSpan: 2, style: 'txt_center' },
                            {},
                            {
                              text: 'Diminution P',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},
                            {
                              text: 'Diminution S',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},
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
                          ],
                          [
                            y.structuralMemberTM4List[0].structuralMemberTitle,
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
                          ...y.structuralMemberTM4List[0].measurementTM4DTOList.map(
                            (z: any) => [
                              z.structuralMember,
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
                            ]
                          ),
                          [
                            y.structuralMemberTM4List[1].structuralMemberTitle,
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
                          ...y.structuralMemberTM4List[1].measurementTM4DTOList.map(
                            (z: any) => [
                              z.structuralMember,
                              z.structuralMember,
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
                            ]
                          ),
                          // ...y.structuralMemberTM4List?.map((z: any) => [
                          //   z[0].structuralMemberTitle,
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          //   {},
                          // ]),
                        ],
                      },
                    },
                  ]
                : []
            ),

            x.formList.map((y: any) =>
              y.type == 'TM5'
                ? [
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '30%',
                          '25%',
                          '7%',
                          '10%',
                          '13%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                          '5%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM5-${this.lsFormTm5[0].code}(1 July 2023)`,
                              style: ['txt_center'],
                              colSpan: 12,
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
                          ],
                          [
                            {
                              text: '',
                              colSpan: 12,
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
                          ],
                          // Table content
                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT OF W.T./O.T. TRANSVERSE BULKHEADS within the cargo tank or cargo hold spaces',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 12,
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
                          ],
                          [
                            {
                              colSpan: 12,
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
                          ],
                          [
                            {
                              text: "Ship's name:",

                              alignment: 'center' as Alignment,

                              colSpan: 1,
                              border: [false, false, false, false],
                            },
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inShipName}`,
                              colSpan: 2,
                              bold: true,
                              border: [false, false, false, false],
                            },
                            {},
                            {
                              text: 'Class Identity No. ',
                              colSpan: 2,
                              border: [false, false, false, false],
                            },
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.inABS}`,
                              colSpan: 2,
                              bold: true,
                              border: [false, false, false, false],
                            },
                            {},

                            {
                              text: 'Report No. ',
                              colSpan: 2,
                              border: [false, false, false, false],
                            },
                            {},
                            {
                              decoration: 'underline' as Decoration,
                              text: `${this.generalParticular[0].reportNo}`,
                              colSpan: 3,
                              bold: true,
                              border: [false, false, false, false],
                            },
                            {},
                            {},
                          ],
                          [
                            {
                              text: '',
                              colSpan: 12,
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
                          ],
                          [
                            {
                              alignment: 'left' as Alignment,

                              text: 'TANK/HOLD DESCRIPTION:',
                              colSpan: 1,
                              style: 'txt_center',
                            },
                            { text: 'a', colSpan: 11, rowSpan: 1, bold: true },
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
                              text: 'LOCATION OF STRUCTURE:',
                              alignment: 'left' as Alignment,

                              colSpan: 1,
                              style: ['txt_center', 'txt_center'],
                            },
                            {
                              text: 'a',
                              colSpan: 6,
                              bold: true,
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                            {
                              text: 'Frame No. :',
                              alignment: 'center' as Alignment,
                              border: [false, false, false, false],
                              colSpan: 2,
                            },
                            {},
                            {
                              text: '42',
                              border: [false, false, true, false],
                              colSpan: 3,
                              bold: true,
                            },
                            {},
                            {},
                          ],
                          [
                            {
                              text: 'STRUCTURAL COMPONENT (PLATING/STIFFENER)',
                              rowSpan: 2,
                              style: 'txt_center',
                            },
                            { text: 'Item', rowSpan: 2, style: 'txt_center' },

                            {
                              text: 'Original Thickness(mm)',
                              rowSpan: 2,
                              style: 'txt_center',
                            },
                            {
                              text: 'Maximum Allowable Dim(mm)',
                              rowSpan: 2,
                              style: 'txt_center',
                            },
                            { text: 'Gauged', colSpan: 2, style: 'txt_center' },
                            {},
                            {
                              text: 'Diminution P',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},
                            {
                              text: 'Diminution S',
                              colSpan: 3,
                              style: 'txt_center',
                            },
                            {},
                            {},
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
                          ],
                        ],
                      },
                    },
                  ]
                : []
            ),
          ]),
        ],
      ],

      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal verion: 0.1.67)
        // snow: `${this.imgN}`,
        snow: `data:image/png;base64,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aNSqVavKlClz7Ngx+QTIkydPokaNKovCpFxdXdu2bduuXTv68NWrVzt37jxu3DgwV1uspKQUMCnaU1IKZerXrx8cAPOVK1cuQoQI8ePHT5MmzalTp1g0c+ZM+agrzlK+96oUSjV58uTEiROXKFHi5s2bZGG+sE172bJla9Wq1ezZs3fu3Jk+ffqBAwcWKFBAf0RBSUkpgFK0p6QUmrRu3brUqVPLM3lPnz49d+5cqVKlJk2a9O7du02bNh08eBCv+eHDh8yZMx85ckT+omSxXrx4oaWCXatXr65Xr56WCQe0B9vpnxLu06fPr1+/evbsOWjQIClRUlIKoBTtKSmFJv378f8IEeLFi1e5cmUpadOmzb59+zw8PGxsbPCRderUiRw5sv9faFUyRc+ePQOstUywK7zRnq2tLR27SpUqkn348GHixIk9PT0lG6p16tSpTgZ169aNoUqicePGrq6u2mIlpWCRoj0lpdCkz58/vzPoy5cvUgLhSULXx48ftZRSAPT48eNkyZJpmWDX3bt35VtqIlp53LhxWiYsyvjaHp08X75848ePl2xoV+fOnQsWLDhjxoyFCxdeuHCBBFzbs2dPbbGSUrBI0Z6SUijWwYMHo0SJkjhx4ps3b5YtW1bdvQ1EhSztieQ1hU+fPkk2DMuY9ipWrFiyZMmHDx/Kd4RDu6C9adOmaRnDmIX2ODstr6QULFK0p6QUitWsWbPMmTPnzJkzatSoESNGPHDggLZAKcCyBtobNmxYr169smTJouXDrrp16yb3bV+8eAEMJUqUKEWKFJy+LA3VKlOmDGOTvvT9+3eyly5dcnJyKl26tCxVUgoeKdpTUgrFunr16r59+7y9vTt37hxm7nxZiayB9rZt2wb66M9oKoVGyQvy8sSFAN+rV68SJEhgWKikFExStKekFLo1bNiwKlWq5MuXT8uHG/348ePbt29fvnz5+PHj+/fvvby83r59+/r165cvXz5//vzp06fg2sOHD+/fv3/37l1PT89bt27duHHj2rVrV65cuXTp0oULF86dO3fmzJlTp06dPHnS3d392LFjR44cOXTo0IEDB2DoVatWxY8ff+/evfv37z948KCbmxtLWYc1WZ9/8V+2wHbYGttky2yfvbAv9vjgwYNHjx49efLk2bNnL168wMG/efPm3bt3oPmHDx8+ffrEkXP8/k8px6lB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`,
        logo: `data:image/png;base64,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`,
      },

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10] as Margins,
        },
        mg_50: {
          margin: [0, 300, 0, 10] as Margins,
        },
        mg_25: {
          margin: [0, 150, 0, 0] as Margins,
        },
        txt_center: {
          alignment: 'center' as Alignment,
        },
        tableStyle: {
          margin: [-20, 0, -20, 0] as Margins,
        },
        shipNameGeneral: {
          margin: [100, 10, 100, 0] as Margins,
        },
        table_name: {
          margin: [20, 0, 20, 0] as Margins,
        },
        info_ship: {
          margin: [80, 10, 15, 10] as Margins,
        },
        footerAndHeader: {
          margin: [0, 0, 0, 0] as Margins,
        },
        footer: {
          margin: [20, 10, 20, 30] as Margins,
        },
        mg_t: {
          margin: [0, 15, 0, 0] as Margins,
          fontSize: 11,
        },
        mg_b: {
          margin: [0, 0, 0, 30] as Margins,
        },
        mg_t_8: {
          margin: [0, 8, 0, 0] as Margins,
        },
        mg_l_20: {
          margin: [20, 0, 0, 0] as Margins,
        },

        mg_l_90: {
          margin: [90, 0, 0, 0] as Margins,
        },
        fontS8: {
          fontSize: 8,
        },
        fontS11: {
          fontSize: 11,
        },
        fontS15: {
          fontSize: 15,
        },
        fontS13: {
          fontSize: 13,
        },
        fontS18: {
          fontSize: 18,
        },

        fontS25: {
          fontSize: 25,
        },
        fontS30: {
          fontSize: 30,
        },
        fontS45: {
          fontSize: 45,
        },
      },
      defaultStyle: {
        fontSize: 9,
        columnGap: 20,
      },
    };
    console.log('p_pageCount' + _pageCount);

    pdfMake.createPdf(pdfDocument).open({}, window);
    // pdfMake.createPdf(pdfDocument).download();
  }

  exportTestPdf() {
    var pdfTest = {
      pageOrientation: 'landscape' as PageOrientation,
      content: [
        {
          style: ['tableStyle', 'fontS8'],
          table: {
            headerRows: 10,
            widths: [
              // '2.2%',
              '9.8%',
              //2
              '3.3%', //2
              '3.2%', //1
              '3.2%', //2
              '3.2%',
              '3.2%',
              '3.2%',
              '3.2%',
              '0.5%', //10
              '3.2%',
              '3.2%',
              '0.5%', //13

              '3.3%', //2
              '3.2%', //1
              '3.2%', //2
              '3.2%',
              '3.2%',
              '3.2%',
              '3.2%',
              '0.5%', //10
              '3.2%',
              '3.2%',
              '0.5%', //13

              '3.3%', //2
              '3.2%', //1
              '3.2%', //2
              '3.2%',
              '3.2%',
              '3.2%',
              '3.2%',
              '0.5%', //10
              '3.2%',
              '3.2%',
              '0.5%', //13
            ],
            body: [
              //Table header
              [
                {
                  text: `TM2i-(1 July 2023)`,
                  style: ['txt_center'],
                  colSpan: 34,
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
                  colSpan: 34,
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
              // Table content
              [
                {
                  text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
                  style: ['txt_center', 'fontS11'],
                  colSpan: 34,
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
                  colSpan: 34,
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

                  colSpan: 3,
                  border: [false, false, false, false],
                },
                {},
                {},
                {
                  decoration: 'underline' as Decoration,
                  text: ``,
                  colSpan: 8,
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
                {
                  text: 'Class Identity No. ',
                  colSpan: 4,
                  border: [false, false, false, false],
                },
                {},
                {},
                {},
                {
                  decoration: 'underline' as Decoration,
                  text: ``,
                  colSpan: 8,
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

                {
                  text: 'Report No. ',
                  colSpan: 3,
                  border: [false, false, false, false],
                },
                {},
                {},
                {
                  decoration: 'underline' as Decoration,
                  text: ``,
                  colSpan: 8,
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
              ],
              [
                {
                  colSpan: 34,
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
                  text: 'STRENGTH DECK AND SHEER STRAKE PLATING',
                  colSpan: 34,
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
                {},
                {
                  style: 'txt_center',
                  text: '1st TRANSVERSE SECTION at Fr.No: ',
                  colSpan: 8,
                  border: [true, true, false, true],
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                  text: ``,
                  border: [false, true, true, true],
                  colSpan: 3,
                  bold: true,
                },
                {},
                {},
                {
                  style: 'txt_center',
                  text: '2nd TRANSVERSE SECTION at Fr.No: ',
                  colSpan: 8,
                  border: [true, true, false, true],
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                  text: ``,
                  border: [false, true, true, true],
                  colSpan: 3,
                  bold: true,
                },
                {},
                {},
                {
                  style: 'txt_center',
                  text: '3rd TRANSVERSE SECTION at Fr.No: ',
                  colSpan: 8,
                  border: [true, true, false, true],
                },
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {
                  text: ``,
                  border: [false, true, true, true],
                  colSpan: 3,
                  bold: true,
                },
                {},
                {},
              ],
              [
                {
                  style: 'txt_center',
                  text: 'STRAKE POSITION',
                  rowSpan: 2,
                },
                { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
                { style: 'txt_center', text: 'Org.Thk.' },
                { style: 'txt_center', text: 'Max.Alwb.Dim' },
                { style: 'txt_center', text: 'Gauged mm  ', colSpan: 2 },
                {},
                { style: 'txt_center', text: 'Diminution P  ', colSpan: 3 },
                {},
                {},
                { style: 'txt_center', text: '    Diminution S  ', colSpan: 3 },
                {},
                {},
                { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
                { style: 'txt_center', text: 'Org.Thk.' },
                { style: 'txt_center', text: 'Max.Alwb.Dim' },
                { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
                {},
                { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
                {},
                {},
                { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
                {},
                {},
                { style: 'txt_center', text: 'No. or Letter', rowSpan: 2 },
                { style: 'txt_center', text: 'Org.Thk.' },
                { style: 'txt_center', text: 'Max.Alwb.Dim' },
                { style: 'txt_center', text: 'Gauged mm', colSpan: 2 },
                {},
                { style: 'txt_center', text: 'Diminution P', colSpan: 3 },
                {},
                {},
                { style: 'txt_center', text: 'Diminution S', colSpan: 3 },
                {},
                {},
              ],
              [
                {},
                {},
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: 'P' },
                { style: 'txt_center', text: 'S' },
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: '%', colSpan: 2 },
                {},
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: '%', colSpan: 2 },
                {},
                {},

                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: 'P' },
                { style: 'txt_center', text: 'S' },
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: '%', colSpan: 2 },
                {},
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: '%', colSpan: 2 },
                {},
                {},

                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: 'P' },
                { style: 'txt_center', text: 'S' },
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: '%', colSpan: 2 },
                {},
                { style: 'txt_center', text: 'mm' },
                { style: 'txt_center', text: '%', colSpan: 2 },
                {},
              ],
              [
                { text: '2nd strake inboard' },

                { text: 'M14' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },

                { text: 'M14' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },

                { text: 'M14' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },
              ],
            ],
          },
        },
        {
          style: ['tableStyle', 'fontS8'],
          table: {
            headerRows: 10,
            //23 rows
            widths: [
              // '4%',
              '38.5%',
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
                  text: `TM1`,
                  //   text: `TM1-${this.typeForm}(1 July 2023)`,
                  style: ['txt_center'],
                  colSpan: 22,
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
              ],
              [
                {
                  text: '',
                  colSpan: 22,
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
              ],
              // table info
              [
                {
                  text: 'Report on THICKNESS MEASUREMENT of ALL DECK PLATING, ALL BOTTOM SHELL PLATING or SIDE SHELL PLATING',
                  style: ['txt_center', 'fontS11'],
                  colSpan: 22,
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
              ],
              [
                {
                  colSpan: 22,
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
              ],
              [
                {
                  text: "Ship's name:",
                  alignment: 'center' as Alignment,
                  // colSpan: 2,
                  border: [false, false, false, false],
                },
                {
                  decoration: 'underline' as Decoration,
                  text: ``,
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
                  text: ``,
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
                  text: ``,
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
                  colSpan: 22,
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
              ],
              // table content
              [
                {
                  text: 'STRAKE POSITION',
                  alignment: 'left' as Alignment,
                  style: 'txt_center',
                },
                {
                  text: `2`,
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
                { text: 'Gauged mm', colSpan: 2, style: 'txt_center' },
                {},
                { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
                {},
                {},
                { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
                {},
                {},

                { text: 'Gauged (mm)', colSpan: 2, style: 'txt_center' },
                {},
                { text: 'Diminution P', colSpan: 3, style: 'txt_center' },
                {},
                {},
                { text: 'Diminution S', colSpan: 3, style: 'txt_center' },
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
              [
                { text: '9th forward' },
                { text: 'E10' },
                { text: '14.5' },

                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },

                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },
                { text: '14.5' },
                { text: '14.5' },
                { text: 'R' },

                { text: '14.5' },
                { text: '14.5' },
                { text: '14.5' },
              ],
            ],
          },
        },
        {
          text: `${this.formService.calculateForMaxAlwbDim('10', 1)}`,
        },
        {
          image:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABMCAIAAAB1Z6caAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA7nSURBVHhe7Zt5VFVVG8axNHNI0UrNeUrRUCtTMFMUh9ByCjNEMyUQdZnK0lUO+GXirGha4UA4EAuXla0GAgUVy8xSk0JJAdFEpUHAqRxTvl+82+Pxcrjcc7nX1TKfv7j77LP3fvY7Pe/JXAr+Y7hL+E7HXcJ3OpxC+O+//z5+/PjevXvj4uKioqIWFSI8PHzt2rXJyck///xzbm6umnrb4TDCkMzOzo6JiRk+fHirVq2qVKly33333XPPPS63omzZshUrVnzooYe6dOkSGhqalJSUn59//fp1tYrz4QDC58+fj46O7tq1a/Xq1RUtm8GNNGrUaMSIEd99993Vq1fVis5EqQhjnPnz57u5uanj38D999/fokWLQYMGjR8/ftq0abNvYPr06UFBQV5eXvXr1y9TpoyaXYhy5coNGDDgiy++wFPU6s6BnYQvX768fv36unXrqvO6uECgdu3agwcP/vzzz/Py8q5du1acozKOMdPS0ohqb29vPFwtUbhIr169CHI11Qmwh/ChQ4eeffZZolFOSax27tx5w4YNpCJ4qkm24cqVK+np6XPmzGnSpIlm82rVqk2dOvXPP/9UkxwKc4QxzqZNmzTDckR3d3dSMQZXM+zFH3/8QQ6DqrZyv379cnJy1GPHwQRh2EZERBCfciZXV9ewsLBz586px45AVlZW7969NVM3a9bsxx9/VM8cBFsJk0uWLl2K98pRyEn79u1TzxyKS5cuvfPOOw888IBsRHpLTU1Vz2wAMYINcA1q5MFbQSTy1CbC2HbmzJnC1iHOxoIoE26QNE72soh8nm7evJkUKNt5eHhwevVMBzIfWQMXIH0QDi+99BKppGXLlrxInSc6KunADTLHJsJsHxsbS9mQ7Vn3zJkz6pl5wG3//v1jx459+OGH/7GgiwtHGTJkCOe2KEi7du0KCAiAzMmTJzmDDELy2LFjXMfEiRORLnXq1JGDWQfVftSoURcvXmSFkgkjCQhXedPPz09eswMc+vvvv/f19S1fvryspgfug+Ns27bNsA7j57t3716wYEGnTp1sYagHRho2bJimakogTDy0a9dO3vT09Dx9+rR6YAZQxYADBw7UEl5RcAs4ZGRkpD7ho+ESExMnTJjQoEEDszw14JJ//fWXWtE6YQ6KNpKc+cgjj+CK6oEZ4JAhISFVq1aV7S3A4rjl6NGjSYEaVSrw9u3bx4wZ8+ijj2rV3g6w+HPPPWcRgNYIZ2RkVK5cWd5ELatRm0GGWL16db169WR7CxBX9BjLly//7bffZD7hTVmaMWNG69atS8NTw9NPP33q1ClZXEOxhNkeTS9vUhvNSih8GDUmr1sAMj169ECBciMyGZcjOSEzDcPbPrRt29awlBRLmG5WiiFGNlVyCTy6Xy3P6VGhQgXJTJJCCJnMzMwpU6Y0bNiwaCNZGlCcCCU5jwWKJUwIycsc0Xbz4pM9e/YsenpM16dPnx07dghVUvEPP/wQGBj44IMPqhmOQ9OmTa20H8aEyR/cOi8TvQkJCWq0JOhltgZWoJZs3bpV6g1W3bNnD52jvklyIEiuXKWcxxDGhD/55BOxUvPmzW3pWohG8rkmPAVQfeKJJ7QWF6qUdPzF7gJTIhAzlHo5UnEwJqz587hx49RQ8cjPz3/llVcs3Jh2D0lMPDMBqj/99BP10ElWFSAnk5OT5UhWYEAYf+7YsSNL3HvvvfHx8Wq0GPz++++kXNlSQKp77bXXtHpw5MgRbk1rBpyEKlWqkPZlR+swIExhlL4UtVC0julx4sSJJ598UrYEGJkClpKSgkl5SrGZO3euM9KSBciIqH3ZtEQYEKYIEX4s1KZNGzVkBCoK/apsCZgcFxcnj0jFCBW8Wj0rHajblMYaOmBPLRHA1pQoMiCMb8haCH01VATkfY0tqWLevHkSrhQw0oaPjw/hIE9NAW41a9Yk1ZHGkVwffPABlYw+FglBptDw66+/ogJ37tz58ccfk18N+43iYEA4PDxctkfiqqFbQbFF5TKBtOzv78/eMk6tDw4OFjVqI3AlMhm14OWXX16xYgUcICOiGhoXLlzIy8tjfS6RlhCqDKJbuIXU1FR9m2E7DAgTeHKaN954Qw3pACu8l6fYgUPIIGUJVUwbIC+WCHg2btx45MiRUVFRhw8f1oQXKTApKWnx4sW0r926deNa8V7NWeCJH0lSQLT98ssvsrspWCM8c+ZMNXQDdIs0caS0WbNmSX3mlBwR4Sphbx3oTdqXJUuWpKWlCUluCo9ds2ZNUFAQ90hAWtGYQpjyw9/4hcMIE5CywdixY9VQIci6fn5+KAf6REmJ2dnZNBjWqyv2qV27Ns3wxo0bjx07RpBDFTchU9Do0hgRArZcFsCZ9YRZTQ5mCgaEY2JiZIOhQ4eqocJsRIxhCs0yNOtWfBgO1atXf/HFFyGWm5vLBRFypLqwsDB8VQ5tChgf9UKZxMn5iYQkvOVspmBAmAwhe3To0EENFRScPXuWAJO/sTB5uDjfI7roH7gamc8FoSinTp3q7u5eGlFJLcAv0tPTWZ+fZBD7PjYZED569Kgsih0sPjufOXOGbs5QNmGB9u3b0xjyOrkUe8IzNDSUDOyQbr5Vq1ZkDUq9XHTfvn3NtugCA8KQlBoLMSqQDLL6li1bHn/8cYt442e9evXGjx9Pj8KVQxUtiYr28PCw8gXLDpDVOAaFQ35ylXIwszAgDDfqPpxpdOQWMezEiRMtkhNF+Jlnnlm7dq24Lj6/YcOG/v37G7b+pQcaQxP5GJmzFR7WNAwIg2+//ZYqL39/+eWXuKXsKqhVq9akSZNQoFwHJkU8T5482fYibAeovVwo7iaXTmJHn8jxzMKYsIA0SJ9IcMqumNTT0xO5R6ok65J7161b99RTT2kTnAd0COd566235OeAAQPkhHbAmDCmQ0WRJ2QDsldAQMCuXbuI0kuXLpGNXn/99UaNGlkRCQ4E9tyzZw8qgKLNT7IGF60Oah4GhCnuVBFSDkvXrVuXexVNw5ZELFHkvE8WhggMDMShaBJk34YNG2pfdu2AJWGKMCUOqtSY1atXI98ZlG/Z/LRI0bcBRC+hyzGkXQGzZ88uPKmduEmYRemTaPo7depEDsR7cWz4Dxs2DDvTnTDy/PPPy663B4QMFY5jLFy4UO4alWp3uhIowqgFKgplBiWoKRj0o/YxvUePHrg0Ndap2VgPGNIzItR2794tpQ5ZTk8mZ7MbLtwf4pm8R/kp2mGymWhXtqd5IpYSExOd/YFKgOSmTFCNCC5thJSpTmYvXFauXGn9HwstWLBAsjFlKTo6Gs4fffSRqS7fDiDjKXtEGe2HjNCKHDhwQJ2pFHAp8bsBHk4Yy67wTEhIwCm2b9/eoEEDGXQsuNzevXuj3lDOQ4YMkdCl1H/44YfctTpTKWBchy2AX6Gi5UDcNBWCven1EMyOzdsUHkQyVMkXVCPxLHoPkpY6SqlhE2FAVkNUybHQd2+//TZRQMVGY1v8Bwe7gZIRMx4/fpxwlauE87Rp06QJdwhsJQwo9xpnTuPr6yuChNKF71n/7mEddPNU19OnTxMscNaCBdvOmzfPSn6xAyYIA2og1Uv7qkaJWrFiBW0GB5X/GkidtN3Jicw2bdpQablKVjh8+DDJQpNx1apVe/fddxlXezsI5ggDctj8+fO1LA29li1bvv/++9DGG0k269evDw4OJrwRSRUqVIAAFySQT+oY0MvLKywsDNcgVqGUnp7+6quvat99WLNt27ZURIdkKQuYJgw4B2q+Z8+eemMicekZ6Su0UokgzcjIoNPcegPffPNNTk4OekYmcDvIVQqPlHoBRX7KlCn2fa+yBfYQFlDPVq1a9dhjj+lpY0a82s/PT8o793LixAmIAcLh4MGD1DNa+TfffJNKCzf9u7Qrffv2RcM6w7Aa7CcswIxr1qzBgYt2xZBhkDKGrwI8vFKlSni1niTgJ+GKisQXHJiNi0NpCQsIbLplXBGDwwo7KzbFg9jmCrp37x4ZGYlEd6pV9XAMYQ1kIFx306ZNM2bMwLHpRtzc3Gi2QP369Wk8aUKGDx/+3nvv7du3jzKuXruNcDBhPTAaJZRQx/6AZEa64kZumzEN4UTC/078JwlT9NA0ERERiFgZFcTHxxNs9Mmoef6g0oiooj3kJ9i2bZuaWlCwceNGGWQ+P0+ePMmCJCRJvPhzUlJSeHj4/wqBFE9OTpbvRwIUCFWa12XCsmXLKOl6UUlQsB3jlDQmsBTHs6Nc/0OYM/n7+5M5X3jhBU3KIRWpFijkr7/+mjzEU0TSoUOHmOzp6SlptlatWvL5mk6VmaIK0Z6M7Nixg5+swEEh5u3tTZlll6VLl9JgI1qoT3QIkregilxj8tChQ6dPn062R4pR0nhLKFG9W7RoUbVq1YEDB9JL0FEhQin4NWrUWL58uSmxrVwagzRu3JjWBGHIT7KL9CtcpyTeooQRg0yYNWsW+/E3BEi/jMtHYwvCXbp0YUKfPn0wES5ADfvss8+4Sp5SyeV7MEfXrhuPoPFmGjdy6tQpzsZe6Bx9whOToF6/+uorNWQDbsawfAdF6OLYaGPII2jF6wwJb968uUmTJlwzmhHN1L59e/nvrEUJ8xNHiIqKQmN37tyZNhBr8+LIkSPpkLKyskRypaSk/HOOG9DyeVpaGh0or1j8g0ICjbLPjsSOGrIBNwljKA7E+/hbzZo1XV1dEYbyyJAwT5csWcIf8oVN/n0JfxQlTJOAZhw0aBDr8AgadNfSA2JVohf78/eECRO0ygw3vJoOFDXOIEqOCXRjZ8+elQksiw7H7dFw3IgM2oKbhAF20D7/Llq0SPMfC8KyPYTxRvmIiaLACYWwPoa5C3HpkJAQLhGrwgHmWAaZNXjwYPl3YHQUo0aNYilchqc+Pj5M5m/5zCATAgICSBn4NnfHIs2bN4cqe3EMU4X9FsIgMzOTdIqX6r91SY4lSeJFrI7FEhMT5bLR+jySf8hDh8C4/J9G+OqWLVt4RcKSt0gTJCcuhRaf9TGyFrGACVwr18TTuLg44tMiAzMB2kT1p59+Ghsby8oIUv0KNsKS8B2Pu4TvdNwlfKfjLuE7GwUF/wdvMpa+Dsv0ggAAAABJRU5ErkJggg==',
        },
      ],
      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal verion: 0.1.67)
        // snow: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/67246509_111387816859260_2386012619652726784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=mq_yiuP1cvEAX8MvYsU&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDw51jhjfX5tfjXBaYXDj8k51y19mb9SGycIt5cqMpoVw&oe=6482AE6A',
        // snow: 'http://vimisco.com/img/logo/logo%20trong.gif',
        snow: `data:image/gif;base64,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`,
      },

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 0, 0, 10] as Margins,
        },
        mg_50: {
          margin: [0, 300, 0, 10] as Margins,
        },
        mg_25: {
          margin: [0, 150, 0, 0] as Margins,
        },
        txt_center: {
          alignment: 'center' as Alignment,
        },
        tableStyle: {
          margin: [-20, 0, -20, 0] as Margins,
        },
        shipNameGeneral: {
          margin: [100, 10, 100, 0] as Margins,
        },
        table_name: {
          margin: [20, 0, 20, 0] as Margins,
        },
        info_ship: {
          margin: [80, 10, 15, 10] as Margins,
        },
        footerAndHeader: {
          margin: [0, 0, 0, 0] as Margins,
        },
        footer: {
          margin: [20, 10, 20, 30] as Margins,
        },
        mg_t: {
          margin: [0, 15, 0, 0] as Margins,
          fontSize: 11,
        },
        mg_b: {
          margin: [0, 0, 0, 30] as Margins,
        },
        mg_t_8: {
          margin: [0, 8, 0, 0] as Margins,
        },
        mg_l_20: {
          margin: [20, 0, 0, 0] as Margins,
        },

        mg_l_90: {
          margin: [90, 0, 0, 0] as Margins,
        },
        fontS8: {
          fontSize: 8,
        },
        fontS11: {
          fontSize: 11,
        },
        fontS15: {
          fontSize: 15,
        },
        fontS13: {
          fontSize: 13,
        },
        fontS18: {
          fontSize: 18,
        },

        fontS25: {
          fontSize: 25,
        },
        fontS30: {
          fontSize: 30,
        },
        fontS45: {
          fontSize: 45,
        },
      },
      defaultStyle: {
        fontSize: 9,
        columnGap: 20,
      },
    };
    pdfMake.createPdf(pdfTest).open({}, window);
  }

  ngOnInit() {
    this.isLoadingSaveButton = true;

    this.mainData = this.localService.getMainData();

    this.generalParticularervice.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticular = data;
        this.generalParticular = this.generalParticular.filter(
          (x) => x.id === this.mainData.mainId
        );
        this.inShipName = this.generalParticular[0].shipInfo.name;
        this.inIMO = this.generalParticular[0].shipInfo.imoNumber;
        this.inABS = this.generalParticular[0].shipInfo.absIdentification;
        this.inPortOf = this.generalParticular[0].shipInfo.postOfRegistry;
        this.inGrossTon = this.generalParticular[0].shipInfo.grossTons;
        this.inDeadWeith = this.generalParticular[0].shipInfo.deadweight;
        this.inDateBuild = this.generalParticular[0].shipInfo.dateOfBuild;
        this.inClassi =
          this.generalParticular[0].shipInfo.classificationSociety;
        this.inCertificateName =
          this.generalParticular[0].certificateDTO.certificateOrganization;
        this.inCertificateNo =
          this.generalParticular[0].certificateDTO.certificateNo;
        this.inCertificateDate = [
          this.generalParticular[0].certificateDTO.validStartDate,
          this.generalParticular[0].certificateDTO.validEndDate,
        ];
        this.inPlaceOf = this.generalParticular[0].placeOfMeasurement;
        this.inFirstDate = this.generalParticular[0].firstDateOfMeasurement;
        this.inLastDate = this.generalParticular[0].lastDateOfMeasurement;
        this.inSpecial = this.generalParticular[0].surveyType;
        this.inDetailOf = this.generalParticular[0].measurementEquipmentInfo;
        this.inReport = this.generalParticular[0].reportNo;
        this.inOperatorName = this.generalParticular[0].nameOfOperator;
        this.inSuveyor = this.generalParticular[0].surveyorInfo;
      },
      (err) => {
        console.log(err);
        alert('Failure to load data from server');
      }
    );
    this.paramService.getParamValueByType(5).subscribe((data) => {
      this.inParam_qualification = data[0].param;
      console.log('param' + this.inParam_qualification);
    });

    this.reportIndexService
      .getReportIndexFromAPI(this.mainData.mainId)
      .subscribe(
        (data) => {
          this.reportIndex = data;
          console.log('Data:', data);
          console.log('Report Index:', this.reportIndex);
          this.parts = this.reportIndex.parts;
          console.log('part:');
          console.log(this.parts);
          this.id_part = this.parts.map((x) => x.id);

          console.log(this.id_part);

          for (let i = 0; i < this.id_part.length; i++) {
            this.dataTm1S
              .getReport_index(this.id_part[i])
              .subscribe((data: {}) => {
                // this.data_part.push(data);
                console.log('data');
                this.data_part.push(data);
                console.log(data);
                console.log(this.data_part);
              });
          }

          for (let i = 0; i < this.parts.length; i++) {
            for (let j = 0; j < this.parts[i].forms.length; j++) {
              switch (this.parts[i].forms[j].name) {
                case 'FORM TM1':
                  this.isTm1OfPart = true;
                  break;
                case 'FORM TM3':
                  this.isTm3OfPart = true;
                  break;
                default:
                  break;
              }
              // if (this.parts[i].forms[j].name == 'FORM TM1') {
              //   this.isTm1OfPart = true;
              //   this.isTm3OfPart = true;
              // }
            }
          }
          this.form_id_name = this.parts.flatMap((part) =>
            part.forms.map((form) => ({
              idForm: form.formID,
              nameForm: form.name,
            }))
          );
          console.log(this.form_id_name);

          for (let i = 0; i < this.form_id_name.length; i++) {
            if (this.form_id_name[i].nameForm === 'FORM TM1') {
              this.dataTm1S
                .getDataTm1FromApi('tm1s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm1.push(data);
                  console.log('tm1');

                  console.log(this.lsFormTm1);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM2(I)') {
              this.dataTm1S
                .getDataTm1FromApi('tm2s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm2i.push(data);
                  console.log('tm2i');

                  console.log(this.lsFormTm2i);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM2(II)') {
              this.dataTm1S
                .getDataTm1FromApi('tm2s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm2ii.push(data);
                  console.log('tm2ii');

                  console.log(this.lsFormTm2ii);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM3') {
              this.dataTm1S
                .getDataTm1FromApi('tm3s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm3.push(data);
                  console.log('tm3');

                  console.log(this.lsFormTm3);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM5') {
              this.dataTm1S
                .getDataTm1FromApi('tm5s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm5.push(data);
                  console.log('tm5');

                  console.log(this.lsFormTm5);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM4') {
              this.dataTm1S
                .getDataTm1FromApi('tm4s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm4.push(data);
                  console.log('tm4');

                  console.log(this.lsFormTm4);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM6') {
              this.dataTm1S
                .getDataTm1FromApi('tm6s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm6.push(data);
                  console.log('tm6');

                  console.log(this.lsFormTm6);
                });
            }
            if (this.form_id_name[i].nameForm === 'FORM TM7') {
              this.dataTm1S
                .getDataTm1FromApi('tm7s', this.form_id_name[i].idForm)
                .subscribe((data) => {
                  this.lsFormTm7.push(data);
                  console.log('tm7');

                  console.log(this.lsFormTm7);
                });
            }
          }
          this.isLoadingSaveButton = false;
        },
        (err) => {
          console.log(err);
          console.log('error');
        }
      );
    // this.exportTestPdf();
  }
}
