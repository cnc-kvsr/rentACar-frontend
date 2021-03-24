import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  filterText = '';
  carImages: CarImage[] = [];
  dataLoaded = false;
  imageBasePath = environment.baseUrl;
  carImage: CarImage;


  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private http:HttpClient
  ) {}

  title = 'ARABA LİSTESİ';
  carFilterText = '';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColorId(params['colorId']);
      } else if (params['brandId'] && params['colorId']) {
        this.getCarDetails(params['carId']);
      } else {
        this.getCars();
      }
    });

    // this.http.get<CarImage[]>("https://localhost:44352/api/carimages/getimagesbycarid").subscribe(data=>{
    //   this.carImages=data
    // });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
