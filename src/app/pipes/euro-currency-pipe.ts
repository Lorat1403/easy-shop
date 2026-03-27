import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroCurrency',
})
export class EuroCurrencyPipe implements PipeTransform {

  transform(value: number |string): string {
   const amount = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(amount)) return '€0';

   
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  }

}

