import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

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
  carFilterText = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private carImageService: CarImageService,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCarImages();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && ['colorId']) {
        this.getCarsByBrandIdAndColorId(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
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
  getCarsByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = response.success;
        this.getCarImages();
      });
  }
  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.cars = response.data;
      console.log(response.data);
      this.dataLoaded = true;
    });
  }

  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  addToCart(car: Car) {
    this.toastrService.success('Ara?? Kiraland??.', car.carName);
    this.cartService.addToCart(car);
  }

}
