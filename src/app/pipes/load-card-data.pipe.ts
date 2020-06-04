import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'loadCardData'
})
export class LoadCardDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
