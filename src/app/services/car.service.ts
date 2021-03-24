import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {
 

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath=environment.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrandId(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath=environment.apiUrl + "cars/getcarsbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColorId(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath=environment.apiUrl + "cars/getcarsbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetail(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + 'cars/getcardetail?carId='+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetails(carId: number): Observable<ListResponseModel<Car>> {
    let newPath=environment.apiUrl + "cars/getcardetails="
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
}
