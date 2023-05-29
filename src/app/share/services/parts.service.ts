import { Injectable } from '@angular/core';
import { partLocal } from '../models/local.model';
import { partsData } from '../datas/local.data';
import { ReportIndexesService } from './report-indexes.service';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  Parts: partLocal[] = partsData;
  constructor(private reportIndexService: ReportIndexesService) {}

  setParts(): partLocal[] {
    return this.Parts;
  }

  reloadParts(id: number) {
    this.reportIndexService.getReportIndexFromAPI(id).subscribe(
      (data) => {
        for (let i: number = 0; i < data.parts.length; i++) {
          this.Parts.push({
            id: data.parts[i].id,
            partIndex: data.parts[i].partIndex,
            partName: data.parts[i].item,
            forms: data.parts[i].forms.sort(
              (a: { index: number }, b: { index: number }) => a.index - b.index
            ),
            visible: false,
            edit: false,
          });
          this.Parts = this.Parts.sort((a, b) => a.partIndex - b.partIndex);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
