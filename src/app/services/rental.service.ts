import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44352/api/rentals/getrentaldetailsdto"

  constructor(private httpClient:HttpClient) { }

  getRentals(): Observable<ListResponseModel<RentalDetailDto>>{
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl);
  }
  checkCarStatus(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/checkcarstatus";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
  add(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}
