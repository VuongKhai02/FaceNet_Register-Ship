import { Pipe, PipeTransform } from '@angular/core';
import { ship } from '../models/ship.model';
import { ShipService } from '../services/ships.service';

@Pipe({
  name: 'shipFilter',
})
export class ShipFilterPipe implements PipeTransform {
  transform(value: ship[], name: string, num1: number, num2: number): ship[] {
    name = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (name !== null) {
      return value.filter((x) =>
        x.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(name)
      );
    } else if (num1 !== null) {
      return value.filter((x) => x.imoNumber === num1);
    } else if (num2 !== null) {
      return value.filter((x) => x.absIdentification === num2);
    } else {
      return value;
    }
  }
}
