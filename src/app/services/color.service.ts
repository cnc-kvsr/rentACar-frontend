import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';


@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44352/api/"

  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"colors/getAll";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
}
