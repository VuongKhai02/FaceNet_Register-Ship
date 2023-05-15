import {
  Margins,
  PageOrientation,
  PageSize,
  Alignment,
  Decoration,
  Column,
  PageBreak,
} from 'pdfmake/interfaces';

export var tableTm2ii_template = {
  headerRows: 10,
  widths: [
    '2.2%',
    '20.2%',
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
        text: `TM2ii-(1 July 2023)`,
        //   text: `TM2ii-${this.typeForm}(1 July 2023)`,
        style: ['txt_center'],
        colSpan: 35,
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
      {},
    ],
    [
      {
        text: '',
        colSpan: 35,
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
      {},
    ],
    // Table content
    [
      {
        text: 'Report on THICKNESS MEASUREMENT OF SHELL AND DECK PLATING (one, two or three transverse sections)',
        style: ['txt_center', 'fontS11'],
        colSpan: 35,
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
      {},
    ],
    [
      {
        colSpan: 35,
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
      {},
    ],
    [
      {
        text: "Ship's name:",

        alignment: 'center' as Alignment,

        colSpan: 4,
        border: [false, false, false, false],
      },
      {},
      {},
      {},
      {
        decoration: 'underline' as Decoration,
        text: 'M/T "TM THAI HA"',
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
        text: '2312321',
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

        text: 'VMC.TUM 123',
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
        colSpan: 35,
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
      {},
    ],
    [
      {
        style: 'txt_center',
        text: 'SHELL PLATING',
        colSpan: 35,
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
      {},
    ],
    [
      {
        style: 'txt_center',
        text: '',
        colSpan: 2,
      },
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
        text: '42',
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
        text: '42',
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
        text: '42',
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
        text: 'No.',
        rowSpan: 2,
      },
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
