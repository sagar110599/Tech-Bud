import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: any): any{
    return value.toString()+"($"+((value*0.014).toFixed(2)).toString()+")";
  }

}
