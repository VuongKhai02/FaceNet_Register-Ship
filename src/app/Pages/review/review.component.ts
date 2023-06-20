import { Component, OnInit } from '@angular/core';
import {
  Margins,
  PageOrientation,
  PageSize,
  Alignment,
  Decoration,
  PageBreak,
} from 'pdfmake/interfaces';
import { zip } from 'rxjs';
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
import { part } from 'src/app/share/models/part.model';
import { FormTm1Service } from './form-tm1.service';
import { FormService } from 'src/app/share/services/form/form.service';
import { SketchService } from './service/sketch.service';
import { Router } from '@angular/router';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

interface formInfo {
  formType: string;
  formId: number;
}
interface id_index_part {
  id: number;
  index: number;
}
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  constructor(
    private dataTm1S: FormTm1Service,
    private generalParticularervice: GetDataService,
    private localService: LocalService,
    private paramService: ParamValueService,
    private reportIndexService: ReportIndexesService,
    private formService: FormService,
    private sketchService: SketchService,
    private router: Router
  ) {}
  formInfo: formInfo[] = [];
  lsSketch: any[] = [];
  report_index: any;
  id_index_part: id_index_part[] = [];
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
  ship: ship[] = [];
  generalParticular: GeneralParticular[] = [];
  certificate: certificate[] = [];

  parts: part[] = [];
  partIndex_ToC: number = 1;
  partIndex_formTm: number = 1;

  isLoadingSaveButton: boolean = false;
  isSurveyorCheck: boolean = false;

  ckeckSurveyorSignature() {
    this.isSurveyorCheck = !this.isSurveyorCheck;
  }

  convertToNumber(str: string): number {
    return Number(str);
  }
  exportPdf() {
    var checkSignature = this.isSurveyorCheck;
    this.ckeckSurveyorSignature();
    // Define Table of content
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
        ...this.reportIndex.parts
          .sort((a, b) => a.partIndex - b.partIndex)
          .map((x) => [
            {
              text: `${this.partIndex_ToC++}`,
              style: ['txt_center'],
            },
            { text: `${x.item}` },
            { text: `....` },
          ]),
      ],
    };
    //Define sizeA4
    const pageSizee = {
      width: 800,
      height: 925,
    };

    // Define pdfDocument
    var pdfDocument = {
      footer: function (currentPage: any, pageCount: any) {
        return {
          columns: [
            [
              {
                alignment: 'left' as Alignment,
                text: "Operator's signature:.................",
              },
            ],
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
        //General Particular
        [
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
                text: `${this.inABS}`,
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
                    margin: [0, 5, 0, 5],
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
                text: `consisting of : ... Sheets`,
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
          },
          { table: tableOfContent, style: ['mg_t_8', 'fontS11'] },
        ],
        //Content
        [
          this.data_part.map((x: any) => [
            //Part cover
            [
              {
                pageBreak: 'before' as PageBreak,
                decoration: 'underline' as Decoration,
                pageOrientation: 'portrait' as PageOrientation,
                alignment: 'center' as Alignment,
                style: ['fontS11', 'mg_50'],
                text: `PART ${this.partIndex_formTm++}`,
                bold: true,
              },
              {
                text: `${x.item}`,
                alignment: 'center' as Alignment,
                style: ['fontS45'],
                bold: true,
              },
            ],
            //Form tm1
            x.formList.map((y: any) =>
              y.type == 'TM1'
                ? [
                    /*
                  - y: form object in formList[]
                  - a: index of lsSketch
                  - b: sketch object in lsSketch[i]
                  - lsSketh: listSketch
                  */
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm1'
                          ? [
                              //image
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                //Trước phần tử này là chuyển sang trang mới, vì vậy trang có image là 1 trang mới
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    //form
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        //23 rows, 106.5%
                        widths: [
                          '45%',
                          '6%',
                          '4.5%',
                          '3%',
                          '3%',
                          '3%',
                          '3%',
                          '1.5%',
                          '3%',
                          '3%',
                          '1.5%',
                          '3%',
                          '3%',
                          '3%',
                          '3%',
                          '1.5%',
                          '3%',
                          '3%',
                          '1.5%',
                          '3%',
                          '3%',
                          '3%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM1${y.code}`,
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
                              margin: [0, 0, 0, 5] as Margins,
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
                            { text: `${z.platePosition ?? ''}` },
                            {
                              style: ['txt_center'],
                              text: `${z.noOrLetter ?? ''}`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.forwardReadingMeasurementDetail
                                  .originalThickness ?? ''
                              }`,
                            },

                            {
                              style: ['txt_center'],
                              text: `${
                                z.forwardReadingMeasurementDetail.gaugedP ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.forwardReadingMeasurementDetail.gaugedS ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.forwardReadingMeasurementDetail.gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z.forwardReadingMeasurementDetail
                                        .originalThickness,
                                      z.forwardReadingMeasurementDetail.gaugedP
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.forwardReadingMeasurementDetail
                                        .originalThickness,
                                      z.forwardReadingMeasurementDetail.gaugedP
                                    )
                                  )
                                )
                                   || z.forwardReadingMeasurementDetail.gaugedP == null ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.forwardReadingMeasurementDetail
                                          .gaugedP
                                      )
                                    )
                              }`,
                            },
                            //R
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.forwardReadingMeasurementDetail.gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.forwardReadingMeasurementDetail.gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.forwardReadingMeasurementDetail
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.forwardReadingMeasurementDetail.gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z.forwardReadingMeasurementDetail
                                        .originalThickness,
                                      z.forwardReadingMeasurementDetail.gaugedS
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.forwardReadingMeasurementDetail
                                        .originalThickness,
                                      z.forwardReadingMeasurementDetail.gaugedS
                                    )
                                  )
                                )
                                  || z.forwardReadingMeasurementDetail.gaugedS == null ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.forwardReadingMeasurementDetail
                                          .gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.forwardReadingMeasurementDetail.gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.forwardReadingMeasurementDetail.gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.forwardReadingMeasurementDetail
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },

                            //after
                            {
                              style: ['txt_center'],
                              text: `${
                                z.afterReadingMeasurementDetail.gaugedP ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.afterReadingMeasurementDetail.gaugedS ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.afterReadingMeasurementDetail
                                      .originalThickness,
                                    z.afterReadingMeasurementDetail.gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.gaugedP
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.gaugedP
                                    )
                                  )
                                ) || z.afterReadingMeasurementDetail.gaugedP ==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.gaugedP
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.afterReadingMeasurementDetail.gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.afterReadingMeasurementDetail.gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.afterReadingMeasurementDetail
                                      .originalThickness,
                                    z.afterReadingMeasurementDetail.gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.gaugedS
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.gaugedS
                                    )
                                  )
                                ) ||z.afterReadingMeasurementDetail.gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.afterReadingMeasurementDetail.gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.forwardReadingMeasurementDetail
                                      .originalThickness,
                                    z.afterReadingMeasurementDetail.gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z.afterReadingMeasurementDetail
                                        .originalThickness,
                                      z.afterReadingMeasurementDetail.percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },

                            //mean
                            {
                              style: ['txt_center'],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateAveragePercent(
                                      z.forwardReadingMeasurementDetail
                                        .originalThickness,
                                      this.formService.calculateForPercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.forwardReadingMeasurementDetail
                                          .gaugedP
                                      ),
                                      this.formService.calculateForPercent(
                                        z.afterReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.gaugedP
                                      )
                                    )
                                  )
                                ) || z.afterReadingMeasurementDetail.gaugedP ==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateAveragePercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        this.formService.calculateForPercent(
                                          z.forwardReadingMeasurementDetail
                                            .originalThickness,
                                          z.forwardReadingMeasurementDetail
                                            .gaugedP
                                        ),
                                        this.formService.calculateForPercent(
                                          z.afterReadingMeasurementDetail
                                            .originalThickness,
                                          z.afterReadingMeasurementDetail
                                            .gaugedP
                                        )
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateAveragePercent(
                                      z.forwardReadingMeasurementDetail
                                        .originalThickness,
                                      this.formService.calculateForPercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.forwardReadingMeasurementDetail
                                          .gaugedS
                                      ),
                                      this.formService.calculateForPercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        z.afterReadingMeasurementDetail.gaugedS
                                      )
                                    )
                                  )
                                ) ||z.afterReadingMeasurementDetail.gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateAveragePercent(
                                        z.forwardReadingMeasurementDetail
                                          .originalThickness,
                                        this.formService.calculateForPercent(
                                          z.forwardReadingMeasurementDetail
                                            .originalThickness,
                                          z.forwardReadingMeasurementDetail
                                            .gaugedS
                                        ),
                                        this.formService.calculateForPercent(
                                          z.forwardReadingMeasurementDetail
                                            .originalThickness,
                                          z.afterReadingMeasurementDetail
                                            .gaugedS
                                        )
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${this.formService.calculateForMaxAlwbDimForString(
                                z.afterReadingMeasurementDetail
                                  .originalThickness,
                                z.afterReadingMeasurementDetail.percent
                              )}`,
                            },
                          ]),
                        ],
                      },
                      layout: {
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            //Form tm2i
            x.formList.map((y: any) =>
              y.type == 'TM2(I)'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm2'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '19.6%',
                          '3.3%',
                          '2.9%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.3%',
                          '2.9%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.3%',
                          '2.9%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM2i${y.code}`,
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
                              margin: [0, 0, 0, 5] as Margins,
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
                            { text: `${z.strakePosition ?? ''}` },
                            //fr 1
                            {
                              text: `${z.firstTransverseSectionMeasurementDetailTM2
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .originalThickness ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${Number(this.formService.calculateForMaxAlwbDimForString(
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDimForString(
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .percent
                              )) : "" }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .gaugedP ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .gaugedS ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                                  )
                                ) ||z
                                .firstTransverseSectionMeasurementDetailTM2
                                .gaugedP ==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    )
                              }`,

                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                                  )
                                ) ||z
                                .firstTransverseSectionMeasurementDetailTM2
                                .gaugedS==null
                                  ? ''
                                  : this.formService.calculateForPercent(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },

                            //fr 2

                            {
                              text: `${z.secondTransverseSectionMeasurementDetailTM2
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .originalThickness ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${Number(this.formService.calculateForMaxAlwbDimForString(
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDimForString(
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .percent
                              )) : "" }`,
                              
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .gaugedP ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .gaugedS ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                                  )
                                ) ||z
                                .secondTransverseSectionMeasurementDetailTM2
                                .gaugedP ==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    )
                              }`,

                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                                  )
                                ) ||z
                                .secondTransverseSectionMeasurementDetailTM2
                                .gaugedS ==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    )
                              }`,
                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',

                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            //fr3

                            {
                              text: `${z.thirdTransverseSectionMeasurementDetailTM2
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .originalThickness ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${Number(this.formService.calculateForMaxAlwbDimForString(
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDimForString(
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .percent
                              )) : "" }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .gaugedP ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .gaugedS ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                                  )
                                )||z
                                .thirdTransverseSectionMeasurementDetailTM2
                                .gaugedP==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    )
                              }`,

                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',

                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                                  )
                                ) || z
                                .thirdTransverseSectionMeasurementDetailTM2
                                .gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    )
                              }`,
                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                          ]),
                        ],
                      },
                      layout: {
                        paddingLeft: () => 2,
                        paddingRight: () => 2,
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            //Form tm2ii
            x.formList.map((y: any) =>
              y.type == 'TM2(II)'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm2'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '19.6%',
                          '3.3%',
                          '2.9%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.3%',
                          '2.9%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.3%',
                          '2.9%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                          '3.0%',
                          '3.0%',
                          '0.8%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM2ii${y.code}`,
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
                              margin: [0, 0, 0, 5] as Margins,
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
                            { text: `${z.strakePosition ?? ''}` },
                            //fr 1
                            {
                              text: `${z.firstTransverseSectionMeasurementDetailTM2
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .originalThickness ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${this.formService.calculateForMaxAlwbDimForString(
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .percent
                              )}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .gaugedP ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.firstTransverseSectionMeasurementDetailTM2
                                  .gaugedS ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                                  )
                                )||z
                                .firstTransverseSectionMeasurementDetailTM2
                                .gaugedP==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    )
                              }`,

                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                                  )
                                ) ||z
                                .firstTransverseSectionMeasurementDetailTM2
                                .gaugedS==null
                                  ? ''
                                  : this.formService.calculateForPercent(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .firstTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },

                            //fr 2

                            {
                              text: `${z.secondTransverseSectionMeasurementDetailTM2
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .originalThickness ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${this.formService.calculateForMaxAlwbDimForString(
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .percent
                              )}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .gaugedP ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.secondTransverseSectionMeasurementDetailTM2
                                  .gaugedS ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                                  )
                                ) ||z
                                .secondTransverseSectionMeasurementDetailTM2
                                .gaugedP==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    )
                              }`,

                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                                  )
                                )|| z
                                .secondTransverseSectionMeasurementDetailTM2
                                .gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    )
                              }`,
                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z
                                      .secondTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .secondTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',

                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            //fr3

                            {
                              text: `${z.thirdTransverseSectionMeasurementDetailTM2
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .originalThickness ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${this.formService.calculateForMaxAlwbDimForString(
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .originalThickness,
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .percent
                              )}`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .gaugedP ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                z.thirdTransverseSectionMeasurementDetailTM2
                                  .gaugedS ?? ''
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedP
                                    )
                                  )
                                )||z
                                .thirdTransverseSectionMeasurementDetailTM2
                                .gaugedP==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    )
                              }`,

                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',

                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                            {
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : this.formService.calculateForMm(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                              }`,
                              style: ['txt_center'],
                            },
                            {
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .gaugedS
                                    )
                                  )
                                )||z
                                .thirdTransverseSectionMeasurementDetailTM2
                                .gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    )
                              }`,
                              style: ['txt_center'],
                              border: [true, true, false, true],
                            },
                            {
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetailTM2
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDimForString(
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .originalThickness,
                                      z
                                        .thirdTransverseSectionMeasurementDetailTM2
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDimForString(
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetailTM2
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                              style: ['txt_center'],
                              border: [false, true, true, true],
                            },
                          ]),
                        ],
                      },
                      layout: {
                        paddingLeft: () => 2,
                        paddingRight: () => 2,
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            //Form tm3
            x.formList.map((y: any) =>
              y.type == 'TM3'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm3'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '18.1%',
                          '4.15%',
                          '2.9%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '0.8%',
                          '2.95%',
                          '2.95%',
                          '0.8%',
                          '4.155%',
                          '2.9%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '0.8%',
                          '2.95%',
                          '2.95%',
                          '0.8%',
                          '4.15%',
                          '2.9%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '2.95%',
                          '0.8%',
                          '2.95%',
                          '2.95%',
                          '0.8%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM3${y.code}`,
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
                              margin: [0, 0, 0, 5] as Margins,
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
                            { text: `${z.structuralMember ?? ''}` },
                            {
                              style: ['txt_center'],
                              text: `${z.firstTransverseSectionMeasurementDetail
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.firstTransverseSectionMeasurementDetail
                                  .originalThickness ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${this.formService.calculateForMaxAlwbDim(
                                z.firstTransverseSectionMeasurementDetail
                                  .originalThickness,
                                z.firstTransverseSectionMeasurementDetail
                                  .percent
                              )}`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.firstTransverseSectionMeasurementDetail
                                  .gaugedP ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.firstTransverseSectionMeasurementDetail
                                  .gaugedS ?? ''
                              }`,
                            },

                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : Number(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.firstTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.firstTransverseSectionMeasurementDetail
                                        .gaugedP
                                    )
                                  )
                                )||z.firstTransverseSectionMeasurementDetail
                                .gaugedP==null
                                  ? ''
                                  : this.formService.calculateForPercent(
                                      z.firstTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.firstTransverseSectionMeasurementDetail
                                        .gaugedP
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDim(
                                      z.firstTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.firstTransverseSectionMeasurementDetail
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ? 'R' 
                                  : '',
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : Number(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.firstTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.firstTransverseSectionMeasurementDetail
                                        .gaugedS
                                    )
                                  )
                                ) || z.firstTransverseSectionMeasurementDetail
                                .gaugedS == null
                                  ? ''
                                  : this.formService.calculateForPercent(
                                      z.firstTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.firstTransverseSectionMeasurementDetail
                                        .gaugedS
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.firstTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.firstTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDim(
                                      z.firstTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.firstTransverseSectionMeasurementDetail
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .firstTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },
                            //fr2
                            {
                              style: ['txt_center'],
                              text: `${
                                z.secondTransverseSectionMeasurementDetail
                                  .originalThickness !== null ?
                                z.noOrLetter : ''}`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.secondTransverseSectionMeasurementDetail
                                  .originalThickness ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${Number(this.formService.calculateForMaxAlwbDim(
                                z.secondTransverseSectionMeasurementDetail
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetail
                                  .percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDim(
                                z.secondTransverseSectionMeasurementDetail
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetail
                                  .percent
                              )) : "" }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.secondTransverseSectionMeasurementDetail
                                  .gaugedP ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.secondTransverseSectionMeasurementDetail
                                  .gaugedS ?? ''
                              }`,
                            },

                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.secondTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.secondTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : Number(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(this.formService.calculateForPercent(
                                z.secondTransverseSectionMeasurementDetail
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetail
                                  .gaugedP
                              )))||z.secondTransverseSectionMeasurementDetail
                              .gaugedP==null?'':Number(this.formService.calculateForPercent(
                                z.secondTransverseSectionMeasurementDetail
                                  .originalThickness,
                                z.secondTransverseSectionMeasurementDetail
                                  .gaugedP
                              ))}`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.secondTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.secondTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.secondTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.secondTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDim(
                                      z.secondTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.secondTransverseSectionMeasurementDetail
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.secondTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.secondTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : Number(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.secondTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.secondTransverseSectionMeasurementDetail
                                        .gaugedS
                                    )
                                  )
                                )||z.secondTransverseSectionMeasurementDetail
                                .gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.secondTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.secondTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.secondTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.secondTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDim(
                                      z.secondTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.secondTransverseSectionMeasurementDetail
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .secondTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },

                            //fr3
                            {
                              style: ['txt_center'],
                              text: `${z.thirdTransverseSectionMeasurementDetail
                                .originalThickness !== null ?
                              z.noOrLetter : ''}`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.thirdTransverseSectionMeasurementDetail
                                  .originalThickness ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(this.formService.calculateForMaxAlwbDim(
                                  z.thirdTransverseSectionMeasurementDetail
                                    .originalThickness,
                                  z.thirdTransverseSectionMeasurementDetail
                                    .percent
                                )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDim(
                                  z.thirdTransverseSectionMeasurementDetail
                                    .originalThickness,
                                  z.thirdTransverseSectionMeasurementDetail
                                    .percent
                                )) : "" 
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.thirdTransverseSectionMeasurementDetail
                                  .gaugedP ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                z.thirdTransverseSectionMeasurementDetail
                                  .gaugedS ?? ''
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) == 0.0
                                  ? ''
                                  : Number(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.thirdTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.thirdTransverseSectionMeasurementDetail
                                        .gaugedP
                                    )
                                  )
                                ) ||z.thirdTransverseSectionMeasurementDetail
                                .gaugedP==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetail
                                      .gaugedP
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDim(
                                      z.thirdTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.thirdTransverseSectionMeasurementDetail
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .gaugedP
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },
                            {
                              style: ['txt_center'],
                              text: `${
                                Number(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) == 0.0
                                  ? ''
                                  : Number(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [true, true, false, true],
                              text: `${
                                Number.isNaN(
                                  Number(
                                    this.formService.calculateForPercent(
                                      z.thirdTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.thirdTransverseSectionMeasurementDetail
                                        .gaugedS
                                    )
                                  )
                                )||z.thirdTransverseSectionMeasurementDetail
                                .gaugedS==null
                                  ? ''
                                  : Number(
                                      this.formService.calculateForPercent(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    )
                              }`,
                            },
                            {
                              style: ['txt_center'],
                              border: [false, true, true, true],
                              text:
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) >=
                                  this.convertToNumber(
                                    this.formService.threePartsFourOfMaxAlwbDim(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ) &&
                                this.convertToNumber(
                                  this.formService.calculateForMm(
                                    z.thirdTransverseSectionMeasurementDetail
                                      .originalThickness,
                                    z.thirdTransverseSectionMeasurementDetail
                                      .gaugedS
                                  )
                                ) <=
                                  this.convertToNumber(
                                    this.formService.calculateForMaxAlwbDim(
                                      z.thirdTransverseSectionMeasurementDetail
                                        .originalThickness,
                                      z.thirdTransverseSectionMeasurementDetail
                                        .percent
                                    )
                                  )
                                  ? 'S'
                                  : this.convertToNumber(
                                      this.formService.calculateForMm(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .gaugedS
                                      )
                                    ) >
                                    this.convertToNumber(
                                      this.formService.calculateForMaxAlwbDim(
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .originalThickness,
                                        z
                                          .thirdTransverseSectionMeasurementDetail
                                          .percent
                                      )
                                    )
                                  ? 'R'
                                  : '',
                            },
                          ]),
                        ],
                      },
                      layout: {
                        paddingLeft: () => 2,
                        paddingRight: () => 2,
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            //Form tm4
            x.formList.map((y: any) =>
              y.type == 'TM4'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm4'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '35.5%',
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
                              text: `TM4${y.code}`,
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
                              margin: [0, 0, 0, 5] as Margins,
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
                              text: `${y.tankDescription}`,
                              colSpan: 11,
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
                            {},
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

                          ...y.structuralMemberTM4List
                            .map((z: any) => {
                              let title = [
                                {
                                  text: `${z.structuralMemberTitle}`,
                                  bold: true,
                                },
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                                {
                                  text: ``,
                                  border: [true, true, false, true],
                                },
                                { text: ``, border: [false, true, true, true] },
                                {},
                                { text: ``, border: [true, true, false, true] },
                                { text: ``, border: [false, true, true, true] },
                              ];

                              let member = z.measurementTM4DTOList.map(
                                (k: any) => [
                                  { text: `${k.structuralMember ?? ''}` },
                                  {
                                    text: `${k.item ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.detailMeasurement.originalThickness ??
                                      ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${this.formService.calculateForMaxAlwbDim(
                                      k.detailMeasurement.originalThickness,
                                      k.detailMeasurement.percent
                                    )}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.detailMeasurement.gaugedP ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.detailMeasurement.gaugedS ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedP
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedP
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedP
                                          )
                                        )
                                      )||k.detailMeasurement.gaugedP==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedP
                                            )
                                          )
                                    }`,
                                    border: [true, true, false, true],
                                    style: ['txt_center'],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedP
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedP
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedP
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    border: [false, true, true, true],
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedS
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedS
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedS
                                          )
                                        )
                                      )||k.detailMeasurement.gaugedS==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedS
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gauged
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gauged
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gauged
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',

                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                ]
                              );
                              return [title, ...member];
                            })
                            .flat(),
                        ],
                      },
                      layout: {
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            //Form tm5
            x.formList.map((y: any) =>
              y.type == 'TM5'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm5'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        //12 rows :105.5
                        widths: [
                          '35.5%',
                          '5%',
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
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM5${y.code}`,
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
                              margin: [0, 0, 0, 5] as Margins,
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
                            {
                              text: `${y.tankHolDescription}`,
                              colSpan: 11,
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
                              text: `${y.frameNo}`,
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

                          ...y.structuralTM5List
                            .map((z: any) => {
                              let title = [
                                {
                                  text: `${z.name}`,
                                  bold: true,
                                },
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                              ];

                              let member = z.measurementTM5List.map(
                                (k: any) => [
                                  {
                                    text: `${k.structuralComponentType ?? ''}`,
                                  },
                                  {
                                    text: `${k.item ?? ''}`,
                                    style: ['txt_center'],
                                  },

                                  {
                                    text: `${
                                      k.measurementDetail.originalThickness ??
                                      ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${this.formService.calculateForMaxAlwbDim(
                                      k.measurementDetail.originalThickness,
                                      k.measurementDetail.percent
                                    )}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.measurementDetail.gaugedP ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.measurementDetail.gaugedS ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.measurementDetail.originalThickness,
                                          k.measurementDetail.gaugedP
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.measurementDetail
                                              .originalThickness,
                                            k.measurementDetail.gaugedP
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.measurementDetail
                                              .originalThickness,
                                            k.measurementDetail.gaugedP
                                          )
                                        )
                                      )||k.measurementDetail.gaugedP==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.gaugedP
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.measurementDetail.originalThickness,
                                          k.measurementDetail.gaugedP
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.measurementDetail.originalThickness,
                                          k.measurementDetail.gaugedP
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.measurementDetail
                                              .originalThickness,
                                            k.measurementDetail.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.gaugedP
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.measurementDetail.originalThickness,
                                          k.measurementDetail.gaugedS
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.measurementDetail
                                              .originalThickness,
                                            k.measurementDetail.gaugedS
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.measurementDetail
                                              .originalThickness,
                                            k.measurementDetail.gaugedS
                                          )
                                        )
                                      )|| k.measurementDetail.gaugedS==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.gaugedS
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.measurementDetail.originalThickness,
                                          k.measurementDetail.gaugedS
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.measurementDetail.originalThickness,
                                          k.measurementDetail.gaugedS
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.measurementDetail
                                              .originalThickness,
                                            k.measurementDetail.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.gaugedS
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.measurementDetail
                                                .originalThickness,
                                              k.measurementDetail.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                ]
                              );
                              return [title, ...member];
                            })
                            .flat(),
                        ],
                      },
                      layout: {
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            //Form tm6
            x.formList.map((y: any) =>
              y.type == 'TM6'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm6'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '35.5%',
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
                          [
                            {
                              text: `TM6${y.code}`,
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
                          //Table name

                          [
                            {
                              text: 'Report on THICKNESS MEASUREMENT OF MISCELLANEOUS STRUCTURAL MEMBERS',
                              style: ['txt_center', 'fontS11'],
                              colSpan: 12,
                              decoration: 'underline' as Decoration,
                              bold: true,
                              margin: [0, 0, 0, 5] as Margins,
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
                            {
                              text: `${y.structuralMembers}`,
                              colSpan: 11,
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
                            {},
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
                              text: 'Description',
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

                          ...y.structuralDescriptionTM6List
                            .map((z: any) => {
                              let title = [
                                {
                                  text: `${z.structuralDescriptionTitle}`,
                                  bold: true,
                                },
                                {},
                                {},
                                {},
                                {},
                                {},
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                              ];

                              let member = z.measurementTM6DTOList.map(
                                (k: any) => [
                                  {
                                    text: `${k.description ?? ''}`,
                                  },
                                  {
                                    text: `${k.item ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.detailMeasurement.originalThickness ??
                                      ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${this.formService.calculateForMaxAlwbDim(
                                      k.detailMeasurement.originalThickness,
                                      k.detailMeasurement.percent
                                    )}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.detailMeasurement.gaugedP ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      k.detailMeasurement.gaugedS ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedP
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedP
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedP
                                          )
                                        )
                                      )||k.detailMeasurement.gaugedP==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedP
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedP
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedP
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedP
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    border: [false, true, true, true],
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedS
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedS
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.gaugedS
                                          )
                                        )
                                      )||k.detailMeasurement.gaugedS==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedS
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedS
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.detailMeasurement.originalThickness,
                                          k.detailMeasurement.gaugedS
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.detailMeasurement
                                              .originalThickness,
                                            k.detailMeasurement.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.gaugedS
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.detailMeasurement
                                                .originalThickness,
                                              k.detailMeasurement.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                ]
                              );
                              return [title, ...member];
                            })
                            .flat(),
                        ],
                      },
                      layout: {
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                      },
                    },
                  ]
                : []
            ),
            ////Form tm7
            x.formList.map((y: any) =>
              y.type == 'TM7'
                ? [
                    this.lsSketch.map((a) =>
                      a.map((b: any) =>
                        b.formId === y.id && b.formType == 'form_tm7'
                          ? [
                              {
                                margin: [-20, -40, -20, -30] as Margins,
                                pageBreak: 'before' as PageBreak,
                                pageOrientation: 'landscape' as PageOrientation,
                                fit: [pageSizee.width, pageSizee.height],
                                image: `data:image/png;base64,${b.value}`,
                              },
                            ]
                          : []
                      )
                    ),
                    {
                      pageBreak: 'before' as PageBreak,
                      pageOrientation: 'landscape' as PageOrientation,
                      style: ['tableStyle', 'fontS8'],
                      table: {
                        headerRows: 10,
                        widths: [
                          '23.8%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '1%',
                          '3.2%',
                          '3.2%',
                          '1%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '1%',
                          '3.2%',
                          '3.2%',
                          '1%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '3.2%',
                          '1%',
                          '3.2%',
                          '3.2%',
                          '1%',
                        ],
                        body: [
                          //Table header
                          [
                            {
                              text: `TM7${y.code}`,
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
                          ],
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
                              margin: [0, 0, 0, 5] as Margins,
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
                          ...y.frameNumberList
                            .map((z: any) => {
                              let title = [
                                {
                                  text: `${z.name}`,
                                  bold: true,
                                },
                                {},
                                {},
                                {},
                                {},
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },

                                {},
                                {},
                                {},
                                {},
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },

                                {},
                                {},
                                {},
                                {},
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                                {},
                                { text: '', border: [true, true, false, true] },
                                { text: '', border: [false, true, true, true] },
                              ];

                              let member = z.measurementTM7DTOList.map(
                                (k: any) => [
                                  { text: `${k.item ?? ''}` },
                                  {
                                    text: `${
                                      k.upperPart.originalThickness ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${Number(this.formService.calculateForMaxAlwbDim(
                                      k.upperPart.originalThickness,
                                      k.upperPart.percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDim(
                                k.upperPart.originalThickness,
                                k.upperPart.percent
                              )) : "" }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${k.upperPart.gaugedP ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${k.upperPart.gaugedS ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.upperPart.originalThickness,
                                          k.upperPart.gaugedP
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.upperPart.originalThickness,
                                            k.upperPart.gaugedP
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.upperPart.originalThickness,
                                            k.upperPart.gaugedP
                                          )
                                        )
                                      )||k.upperPart.gaugedP==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.upperPart.originalThickness,
                                              k.upperPart.gaugedP
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.upperPart.originalThickness,
                                          k.upperPart.gaugedP
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.upperPart.originalThickness,
                                              k.upperPart.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.upperPart.originalThickness,
                                          k.upperPart.gaugedP
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.upperPart.originalThickness,
                                            k.upperPart.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.upperPart.originalThickness,
                                              k.upperPart.gaugedP
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.upperPart.originalThickness,
                                              k.upperPart.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.upperPart.originalThickness,
                                          k.upperPart.gaugedS
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.upperPart.originalThickness,
                                            k.upperPart.gaugedS
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.upperPart.originalThickness,
                                            k.upperPart.gaugedS
                                          )
                                        )
                                      )|| k.upperPart.gaugedS==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.upperPart.originalThickness,
                                              k.upperPart.gaugedS
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.upperPart.originalThickness,
                                          k.upperPart.gaugedS
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.upperPart.originalThickness,
                                              k.upperPart.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.upperPart.originalThickness,
                                          k.upperPart.gaugedS
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.upperPart.originalThickness,
                                            k.upperPart.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.upperPart.originalThickness,
                                              k.upperPart.gaugedS
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.upperPart.originalThickness,
                                              k.upperPart.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },

                                  {
                                    text: `${
                                      k.midPart.originalThickness ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${Number(this.formService.calculateForMaxAlwbDim(
                                      k.midPart.originalThickness,
                                      k.midPart.percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDim(
                                k.midPart.originalThickness,
                                k.midPart.percent
                              )) : "" }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${k.midPart.gaugedP ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${k.midPart.gaugedS ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.midPart.originalThickness,
                                          k.midPart.gaugedP
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.midPart.originalThickness,
                                            k.midPart.gaugedP
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.midPart.originalThickness,
                                            k.midPart.gaugedP
                                          )
                                        )
                                      )||k.midPart.gaugedP==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.midPart.originalThickness,
                                              k.midPart.gaugedP
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.midPart.originalThickness,
                                          k.midPart.gaugedP
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.midPart.originalThickness,
                                              k.midPart.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.midPart.originalThickness,
                                          k.midPart.gaugedP
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.midPart.originalThickness,
                                            k.midPart.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.midPart.originalThickness,
                                              k.midPart.gaugedP
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.midPart.originalThickness,
                                              k.midPart.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.midPart.originalThickness,
                                          k.midPart.gaugedS
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.midPart.originalThickness,
                                            k.midPart.gaugedS
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.midPart.originalThickness,
                                            k.midPart.gaugedS
                                          )
                                        )
                                      )||k.midPart.gaugedS==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.midPart.originalThickness,
                                              k.midPart.gaugedS
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.midPart.originalThickness,
                                          k.midPart.gaugedS
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.midPart.originalThickness,
                                              k.midPart.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.midPart.originalThickness,
                                          k.midPart.gaugedS
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.midPart.originalThickness,
                                            k.midPart.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.midPart.originalThickness,
                                              k.midPart.gaugedS
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.midPart.originalThickness,
                                              k.midPart.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                  {
                                    text: `${
                                      k.lowerPart.originalThickness ?? ''
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${Number(this.formService.calculateForMaxAlwbDim(
                                      k.lowerPart.originalThickness,
                                      k.lowerPart.percent
                              )) != 0.0 ? Number(this.formService.calculateForMaxAlwbDim(
                                k.lowerPart.originalThickness,
                                k.lowerPart.percent
                              )) : "" }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${k.lowerPart.gaugedP ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${k.lowerPart.gaugedS ?? ''}`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.lowerPart.originalThickness,
                                          k.lowerPart.gaugedP
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.lowerPart.originalThickness,
                                            k.lowerPart.gaugedP
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.lowerPart.originalThickness,
                                            k.lowerPart.gaugedP
                                          )
                                        )
                                      )||k.lowerPart.gaugedP==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.gaugedP
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.lowerPart.originalThickness,
                                          k.lowerPart.gaugedP
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.lowerPart.originalThickness,
                                          k.lowerPart.gaugedP
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.lowerPart.originalThickness,
                                            k.lowerPart.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.gaugedP
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                  {
                                    text: `${
                                      Number(
                                        this.formService.calculateForMm(
                                          k.lowerPart.originalThickness,
                                          k.lowerPart.gaugedS
                                        )
                                      ) == 0.0
                                        ? ''
                                        : this.formService.calculateForMm(
                                            k.lowerPart.originalThickness,
                                            k.lowerPart.gaugedS
                                          )
                                    }`,
                                    style: ['txt_center'],
                                  },
                                  {
                                    text: `${
                                      Number.isNaN(
                                        Number(
                                          this.formService.calculateForPercent(
                                            k.lowerPart.originalThickness,
                                            k.lowerPart.gaugedS
                                          )
                                        )
                                      )||k.lowerPart.gaugedS==null
                                        ? ''
                                        : Number(
                                            this.formService.calculateForPercent(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.gaugedS
                                            )
                                          )
                                    }`,
                                    style: ['txt_center'],
                                    border: [true, true, false, true],
                                  },
                                  {
                                    text:
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.lowerPart.originalThickness,
                                          k.lowerPart.gaugedS
                                        )
                                      ) >=
                                        this.convertToNumber(
                                          this.formService.threePartsFourOfMaxAlwbDim(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.percent
                                            )
                                          )
                                        ) &&
                                      this.convertToNumber(
                                        this.formService.calculateForMm(
                                          k.lowerPart.originalThickness,
                                          k.lowerPart.gaugedS
                                        )
                                      ) <=
                                        this.convertToNumber(
                                          this.formService.calculateForMaxAlwbDim(
                                            k.lowerPart.originalThickness,
                                            k.lowerPart.percent
                                          )
                                        )
                                        ? 'S'
                                        : this.convertToNumber(
                                            this.formService.calculateForMm(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.gaugedS
                                            )
                                          ) >
                                          this.convertToNumber(
                                            this.formService.calculateForMaxAlwbDim(
                                              k.lowerPart.originalThickness,
                                              k.lowerPart.percent
                                            )
                                          )
                                        ? 'R'
                                        : '',
                                    style: ['txt_center'],
                                    border: [false, true, true, true],
                                  },
                                ]
                              );
                              return [title, ...member];
                            })
                            .flat(),
                        ],
                      },
                      layout: {
                        paddingTop: () => 1,
                        paddingBottom: () => 1,
                        paddingLeft: () => 2,
                        paddingRight: () => 2,
                      },
                    },
                  ]
                : []
            ),
          ]),
        ],
      ],
      //Define stye common
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
          margin: [-20, 0, 20, 0] as Margins,
        },
        footer: {
          margin: [20, 10, 20, 30] as Margins,
        },
        mg_t: {
          margin: [0, 15, 0, 0] as Margins,
          fontSize: 11,
        },
        mg_t_8: {
          margin: [0, 8, 0, 0] as Margins,
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
        fontS45: {
          fontSize: 45,
        },
      },
      //if not styles is applied
      defaultStyle: {
        fontSize: 9,
        columnGap: 20,
      },
    };
    pdfMake.createPdf(pdfDocument).download();
  }

  ngOnInit() {
    this.isLoadingSaveButton = true;
    //lấy đúng dữ liệu đang được sử dụng
    this.mainData = this.localService.getMainData();
    this.isSurveyorCheck = this.mainData.surveyorSign;
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
        alert('Failure to load data from server');
      }
    );
    this.paramService.getParamValueByType(5).subscribe((data) => {
      this.inParam_qualification = data[0].param;
    });

    this.reportIndexService
      .getReportIndexFromAPI(this.mainData.mainId)
      .subscribe(
        (data) => {
          this.reportIndex = data;
          this.parts = this.reportIndex.parts;
          this.formInfo = this.parts.flatMap((part) =>
            part.forms.map((form) => ({
              formType: form.name,
              formId: form.formID,
            }))
          );
          for (let i = 0; i < this.formInfo.length; i++) {
            if (this.formInfo[i].formType.includes('TM1')) {
              this.sketchService
                .getSketchFromApi('form_tm1', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                });
            }
            if (this.formInfo[i].formType.includes('TM2')) {
              this.sketchService
                .getSketchFromApi('form_tm2', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                });
            }
            if (this.formInfo[i].formType.includes('TM3')) {
              this.sketchService
                .getSketchFromApi('form_tm3', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                });
            }
            if (this.formInfo[i].formType.includes('TM4')) {
              this.sketchService
                .getSketchFromApi('form_tm4', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                });
            }
            if (this.formInfo[i].formType.includes('TM5')) {
              this.sketchService
                .getSketchFromApi('form_tm5', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                });
            }
            if (this.formInfo[i].formType.includes('TM6')) {
              console.log("id 6" ,this.formInfo[i].formId);

              this.sketchService
              .getSketchFromApi('form_tm6', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                  console.log("ls sk7", this.lsSketch)

                });
            }
            if (this.formInfo[i].formType.includes('TM7')) {
              this.sketchService
                .getSketchFromApi('form_tm7', this.formInfo[i].formId)
                .subscribe((data) => {
                  this.lsSketch.push(data);
                });
            }
          }
          this.id_index_part = this.parts
            .map((x) => ({
              id: x.id,
              index: x.partIndex,
            }))
            .sort((a, b) => a.index - b.index);

          let listPro = [];
          for (let i = 0; i < this.id_index_part.length; i++) {
            listPro.push(
              this.dataTm1S.getReport_index(this.id_index_part[i].id)
            );
          }

          zip(...listPro).subscribe((data: {}) => {
            if (Array.isArray(data)) {
              this.data_part = data;
            }
            this.isLoadingSaveButton = false;
            this.mainData.loading = false;
            this.exportPdf();
          });
        },
        (err) => {
          alert('Failure to load data from server');
        }
      );
    this.router.navigateByUrl('history');
  }
}
