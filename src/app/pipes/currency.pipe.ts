import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '$'): string {
    return currencySymbol + value.toFixed(2);
  }
}