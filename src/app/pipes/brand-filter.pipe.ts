import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: Brand[], brandFilterText: string): Brand[] {
    brandFilterText = brandFilterText?brandFilterText.toLocaleLowerCase():""
    return brandFilterText?value
    .filter((b:Brand)=>b.brandName.toLocaleLowerCase().indexOf(brandFilterText)!==-1)
    :value;
  }

}
