import { Pipe, PipeTransform } from '@angular/core';
import { certificate } from '../models/certificate.model';

@Pipe({
  name: 'certificateLoad',
})
export class CertificateLoadPipe implements PipeTransform {
  transform(value: certificate[]): certificate[] {
    return value;
  }
}
