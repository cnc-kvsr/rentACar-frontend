import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
carToBeRented:Rental;
amountPaye:number=0;


  constructor(
    private httpClient:HttpClient
  ) { }

  getAll():Observable<ListResponseModel<Payment>>{
    let newPath=environment.baseUrl+"payments/getall";
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  add(payment:Payment):Observable<ResponseModel>{
    let newPath=environment.apiUrl+"payments/add";
    return this.httpClient.post<ResponseModel>(newPath,payment)
  }
  getRental(){
    return this.carToBeRented;
  }

  getRentalAmountPaye(){
    return this.amountPaye;
  }

  setRental(rental:Rental,amountOfPayment:number){
    this.carToBeRented=rental;
    this.amountPaye=amountOfPayment;
  }

}
