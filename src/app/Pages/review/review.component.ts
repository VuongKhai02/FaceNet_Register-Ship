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

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor(
    private shipSevice: ShipService,
    private generalParticularervice: GetDataService,
    private certificateService: CertificateService,
    private localService: LocalService,
    private paramService: ParamValueService,
    private reportIndexService: ReportIndexesService
  ) {}

  tableTm1_template = new TableTm1_Template().tableTm1_template;

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
  ship: ship[] = [];
  generalParticular: GeneralParticular[] = [];

  books: any = [];
  isSurveyorCheck: boolean = false;
  certificate: certificate[] = [];

  ckeckSurveyorSignature() {
    this.isSurveyorCheck = !this.isSurveyorCheck;
    console.log(this.isSurveyorCheck);
  }
  typeForm: string = 'DHT(i)';
  exportPdf() {
    const bookNames = this.books.map((item: any) => item.author);
    var abc = '123';
    var checkSignature = this.isSurveyorCheck;
    this.ckeckSurveyorSignature();
    let a = bookNames[0];
    let b = bookNames[1];
    let c = bookNames[2];
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
        ...this.books.map((book: any) => [book.id, book.name, book.author]),
      ],
    };
    // Define tables
    var tableTm1 = this.tableTm1_template;
    var tableTm1_c = tableTm1_template_c;
    var tableTm2i = tableTm2i_template;
    var tableTm2ii = tableTm2ii_template;
    var tableTm3 = tableTm3_template;
    var tableTm4 = tableTm4_template;
    var tableTm5 = tableTm5_template;
    var tableTm6 = tableTm6_template;
    var tableTm7 = tableTm7_template;

    // Define pdfDocument
    var pdfDocument = {
      footer: function (currentPage: any, pageCount: any) {
        return {
          columns: [
            {
              alignment: 'left' as Alignment,
              text: "Operator's signature:.................",
            },

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
        // this.a==true ? [{ table:  table  }] : [{table:  table1 }],
        {
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
          text: 'VIET NAM MARINE INDUSTRY AND SERVICE JOINT STOCK COMPANY :',
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
              text: `consisting of :`,
            },
            {
              text: `Sheets`,
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
        //Table of Content
        {
          text: 'THICKNESS MEASUREMENT REPORT INDEX',
          style: ['header', 'txt_center'],
          bold: true,
          pageBreak: 'before' as PageBreak,
        },
        {
          columns: [
            {
              style: ['mg_l_90'],
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
              style: ['mg_l_90'],
              text: 'IMO No.',
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
              style: ['mg_l_90'],
              text: 'CLASS ID. ',
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
              text: 'REPORT No. ',
              style: ['mg_l_90'],
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
              style: ['mg_l_90'],
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
        { table: tableOfContent, style: ['mg_t_8'] },
        // pageTitle
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 1',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],

        // Form
        [
          {
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm4,
            style: ['tableStyle', 'fontS8'],
          },
        ],
        {
          image: 'snow',
          pageBreak: 'before' as PageBreak,
          margin: [-50, -50, 0, 0] as Margins,
        },
        // pageTitle
        [
          {
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'portrait' as PageOrientation,
            decoration: 'underline' as Decoration,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 2',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],
        // form
        [
          {
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm5,
            style: ['tableStyle', 'fontS8'],
          },
        ],

        // pageTitle
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            pageOrientation: 'portrait' as PageOrientation,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 3',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],
        // form
        [
          {
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            style: ['fontS8', 'tableStyleLarge'],
            table: tableTm2i,
          },
        ],

        // // pageTitle Tm2ii
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            pageOrientation: 'portrait' as PageOrientation,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 4',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],
        // form
        [
          {
            style: ['fontS8', 'tableStyleLarge'],
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm2ii,
          },
        ],

        // // pageTitle Tm3
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            pageOrientation: 'portrait' as PageOrientation,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 5',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],
        // form
        [
          {
            style: ['fontS8', 'tableStyleLarge'],
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm3,
          },
        ],

        // // pageTitle Tm6
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            pageOrientation: 'portrait' as PageOrientation,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 6',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],
        // form
        [
          {
            style: ['fontS8'],
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm6,
          },
        ],

        //  pageTitle Tm7
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            pageOrientation: 'portrait' as PageOrientation,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 7',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],

        [
          {
            style: ['fontS8', 'tableStyleLarge'],
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm7,
          },
        ],
        //  pageTitle Tm1
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            pageOrientation: 'portrait' as PageOrientation,
            alignment: 'center' as Alignment,
            style: ['fontS30', 'mg_50'],
            text: 'PART 8',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],

        [
          {
            style: ['fontS8', 'tableStyleLarge'],
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm1,
          },
        ],
        [
          {
            style: ['fontS8', 'tableStyleLarge'],
            pageBreak: 'before' as PageBreak,
            pageOrientation: 'landscape' as PageOrientation,
            table: tableTm1_c,
          },
        ],

        //  pageTitle new
        [
          {
            pageBreak: 'before' as PageBreak,
            decoration: 'underline' as Decoration,
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            text: 'PART new',
            bold: true,
          },
          {
            decoration: 'underline' as Decoration,
            text: 'MAIN DECK',
            alignment: 'center' as Alignment,
            style: ['fontS30'],
            bold: true,
          },
        ],

        // ...this.tm4.map((x) => [
        //   { text: `${x.id}`, style: 'txt_center' },
        //   { text: `${x.structuralMember}` },
        //   { text: `${x.item}`, style: 'txt_center' },
        //   { text: `${x.originalThickness}`, style: 'txt_center' },
        //   { text: `${x.maximumAllowableDim}`, style: 'txt_center' },
        //   { text: `${x.gaugedP}`, style: 'txt_center' },
        //   { text: `${x.gaugedS}`, style: 'txt_center' },
        //   { text: `${x.diminutionPmm}`, style: 'txt_center' },
        //   { text: `${x.diminutionPpercent}`, style: 'txt_center' },
        //   { text: `${x.isStandardP}`, style: 'txt_center' },
        //   { text: `${x.diminutionSmm}`, style: 'txt_center' },
        //   { text: `${x.diminutionSpercent}`, style: 'txt_center' },
        //   { text: `${x.isStandardS}`, style: 'txt_center' },
        // ]),
        // this.arr.map((x, y) => [
        //   ...(x.typeForm == 'tm4'
        //     ? [
        //         {
        //           style: ['fontS8', 'tableStyleLarge'],
        //           pageBreak: 'before' as PageBreak,
        //           pageOrientation: 'landscape' as PageOrientation,
        //           table: tableTm4,
        //         },
        //       ]
        //     : []),
        // ]),
        // this.arr.map((x, y) => [
        //   ...(x.typeForm == 'tm5'
        //     ? [
        //         {
        //           style: ['fontS8', 'tableStyleLarge'],
        //           pageBreak: 'before' as PageBreak,
        //           pageOrientation: 'landscape' as PageOrientation,
        //           table: tableTm5,
        //         },
        //       ]
        //     : []),
        // ]),
      ],

      images: {
        // in browser is supported loading images via url (https or http protocol) (minimal verion: 0.1.67)
        snow: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/67246509_111387816859260_2386012619652726784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=mq_yiuP1cvEAX8MvYsU&_nc_ht=scontent.fhan17-1.fna&oh=00_AfDw51jhjfX5tfjXBaYXDj8k51y19mb9SGycIt5cqMpoVw&oe=6482AE6A',
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
        txt_center: {
          alignment: 'center' as Alignment,
        },
        tableStyle: {
          margin: [-20, 0, -20, 0] as Margins,
        },

        tableStyleLarge: {
          margin: [-30, 0, -20, 0] as Margins,
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
        fontS18: {
          fontSize: 18,
        },
        fontS30: {
          fontSize: 30,
        },
      },
      defaultStyle: {
        fontSize: 9,
        columnGap: 20,
      },
    };

    // if (this.checkb) {
    //   pdfMake.createPdf(pdfDocument).open({}, window);
    // } else {
    //   pdfMake.createPdf(pdfDocumentNoSurveyor).open({}, window);
    // }
    pdfMake.createPdf(pdfDocument).open({}, window);
  }

  ngOnInit() {
    this.mainData = this.localService.getMainData();
    console.log('This is mainDT' + this.mainData);

    this.generalParticularervice.getGeneralParticularsFromAPI().subscribe(
      (data) => {
        this.generalParticular = data;
        this.generalParticular = this.generalParticular.filter(
          (x) => x.id === this.mainData.mainId
        );
        console.log(this.generalParticular);

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
    this.shipSevice.getShipsFromAPI().subscribe((data) => {});

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
        },
        (err) => {
          console.log(err);
          console.log('error');
        }
      );
    // this.certificateService.getCertificateFromAPI().subscribe((data) => {
    //   this.certificate = data;
    //   console.log(this.certificate);
    // });

    // console.log(this.ship);
  }
}
