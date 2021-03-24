import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  cars: Car[] = [];
  carDetails:CarDetail;
  rentals: Rental[] = [];
  carImage: CarImage;
  imageBasePath = "https://localhost:44352";
  currentImage: CarImage;
  dataLoaded = false;

  constructor(
    private carImageService: CarImageService,
    private carDetailService: CarDetailService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCarImages();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getImagesByCarId(params['carId']);
      }
    });
   
  }
  getCarDetails(carId: number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetails = response.data[0];
      this.dataLoaded = true;
    });
  }
  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
  getCarImages() {
    this.carImageService.getCarImages().subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
  getButtonClass(carImage: CarImage) {
    if (carImage == this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

  getCurrentCarImageClass(carImage: CarImage) {
    if (carImage == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  
}
