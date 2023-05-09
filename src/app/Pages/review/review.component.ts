import { Component } from '@angular/core';
import { tableTm1_template } from './tableTemplate/tableTm1_template';
import { tableTm2i_template } from './tableTemplate/tableTm2i_template';
import { tableTm2ii_template } from './tableTemplate/tableTm2ii_template';
import { tableTm3_template } from './tableTemplate/tableTm3_template';
import { tableTm4_template } from './tableTemplate/tableTm4_template';
import { tableTm5_template } from './tableTemplate/tableTm5_template';
import { tableTm6_template } from './tableTemplate/tableTm6_template';
import { tableTm7_template } from './tableTemplate/tableTm7_template';

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
export class ReviewComponent {
  books: any = [];
  checkb: boolean = false;
  ck(event: any) {
    console.log(event);
    this.checkb = !this.checkb;
    console.log(this.checkb);
  }
  typeForm: string = 'DHT(i)';
  exportPdf() {
    const bookNames = this.books.map((item: any) => item.author);
    var abc = '123';

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
    var tableTm1 = tableTm1_template;
    var tableTm2i = tableTm2i_template;
    var tableTm2ii = tableTm2ii_template;
    var tableTm3 = tableTm3_template;
    var tableTm4 = tableTm4_template;
    var tableTm5 = tableTm5_template;
    var tableTm6 = tableTm6_template;
    var tableTm7 = tableTm7_template;

    // Define pdfDocument
    var pdfDocument = {
      // header: [
      //   {
      //     text: `TM1-${this.typeForm}(1 July 2023)`,
      //     alignment: 'right' as Alignment,
      //     style: ['footerAndHeader'],
      //   },
      // ],
      footer: function (currentPage: any, pageCount: any) {
        return {
          columns: [
            {
              alignment: 'left' as Alignment,
              text: "Operator's signature:.................",
            },

            // this.a==true ? [{ table:  table  }] : [{table:  table1 }],
            {
              alignment: 'center' as Alignment,
              text: "Surveyor's signature:.................",
            },
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
          text: 'GENERAL PARTICULARS',
          style: ['header', 'fontS18', 'txt_center'],
          bold: true,
        },
        {
          columns: [
            {
              text: "Ship's name: ",
            },
            {
              text: `${a}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${b}`,
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
              text: `${a}`,
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
              text: `${a} to ${b}`,
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
              text: `${b}`,
              bold: true,
            },
          ],
          style: ['mg_t'],
        },
        {
          columns: [
            {
              text: 'First date of measurement : ',
            },
            {
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${a}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: ` ${abc}`,
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
              text: `...........................`,
              bold: true,
            },
            {
              text: 'Name of suveyor : ',
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
              text: `${a}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${a}`,
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
              text: `${a}`,
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
            decoration: 'underline' as Decoration,
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/321942375_3283766285218191_7497439924667320227_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_ohc=AaNxtcOjtp4AX9K_80H&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAhQc6ut-l8LJyZVYT-drHNSel-n_qIoSg0itHByNKCXg&oe=644D21E0',
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

    var pdfDocumentNoSurveyor = {
      // header: [
      //   {
      //     text: `TM1-${this.typeForm}(1 July 2023)`,
      //     alignment: 'right' as Alignment,
      //     style: ['footerAndHeader'],
      //   },
      // ],

      footer: function (currentPage: any, pageCount: any) {
        abc = pageCount.toString();
        console.log(abc);

        return {
          columns: [
            {
              alignment: 'left' as Alignment,
              text: "Operator's signature:.................",
            },

            // this.a==true ? [{ table:  table  }] : [{table:  table1 }],
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
          text: 'GENERAL PARTICULARS',
          style: ['header', 'fontS18', 'txt_center'],
          bold: true,
        },
        {
          columns: [
            {
              text: "Ship's name: ",
            },
            {
              text: `${a}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${b}`,
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
              text: `${a}`,
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
              text: `${a} to ${b}`,
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
              text: `${b}`,
              bold: true,
            },
          ],
          style: ['mg_t'],
        },
        {
          columns: [
            {
              text: 'First date of measurement : ',
            },
            {
              text: `${c}`,
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
              text: `${b}`,
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
              text: `${a}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: ` ${c}`,
              bold: true,
            },
            {
              text: `consisting of  ${abc} :`,
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
              text: `...........................`,
              bold: true,
            },
            {
              text: 'Name of suveyor : ',
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
              text: `${a}`,
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
              text: `${b}`,
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
              text: `${c}`,
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
              text: `${a}`,
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
              text: `${a}`,
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
            decoration: 'underline' as Decoration,
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
            alignment: 'center' as Alignment,
            style: ['fontS30'],
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
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
        snow: 'https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/321942375_3283766285218191_7497439924667320227_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_ohc=AaNxtcOjtp4AX9K_80H&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAhQc6ut-l8LJyZVYT-drHNSel-n_qIoSg0itHByNKCXg&oe=644D21E0',
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
    if (this.checkb) {
      pdfMake.createPdf(pdfDocument).open({}, window);
    } else {
      pdfMake.createPdf(pdfDocumentNoSurveyor).open({}, window);
    }
  }
}
