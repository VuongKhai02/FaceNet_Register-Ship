import {
  Margins,
  PageOrientation,
  PageSize,
  Alignment,
  Decoration,
  Column,
  PageBreak,
} from 'pdfmake/interfaces';

export var tableTm3_template = {
  headerRows: 10,
  widths: [
    '5%',
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
        text: `TM3-(1 July 2023)`,
        //   text: `TM5-${this.typeForm}(1 July 2023)`,
        style: ['txt_center'],
        colSpan: 13,
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
    ],
    [
      {
        text: '',
        colSpan: 13,
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
    ],
    // Table content
    [
      {
        text: 'Report on THICKNESS MEASUREMENT OF W.T./O.T. TRANSVERSE BULKHEADS within the cargo tank or cargo hold spaces',
        style: ['txt_center', 'fontS11'],
        colSpan: 13,
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
    ],
    [
      {
        colSpan: 13,
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
        text: '2312321',
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

        text: 'VMC.TUM 123',
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
        colSpan: 13,
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
    ],
    [
      {
        alignment: 'left' as Alignment,

        text: 'TANK/HOLD DESCRIPTION:',
        colSpan: 2,
        style: 'txt_center',
      },
      '',
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

        colSpan: 2,
        style: ['txt_center', 'txt_center'],
      },
      {},
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
      { text: 'No.', rowSpan: 2, style: 'txt_center' },
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
  ],
};
