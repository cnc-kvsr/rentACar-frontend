import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Car[], carFilterText: string): Car[] {
    carFilterText = carFilterText?carFilterText.toLocaleLowerCase():""
    
    return carFilterText?value
    .filter((c:Car)=>
    c.carName.toLocaleLowerCase().indexOf(carFilterText)!==-1 ||
    c.brandName.toLocaleLowerCase().indexOf(carFilterText)!==-1 ||
    c.colorName.toLocaleLowerCase().indexOf(carFilterText)!==-1)
    :value;
  }

}
