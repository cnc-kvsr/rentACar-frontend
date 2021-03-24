import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarDetail } from '../models/carDetail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) { }

  getCarDetail(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=environment.apiUrl+"cars/getcardetail?carId="+carId;
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath)
  }
}
