import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  cars: Car[] = [];
  carDetails: CarDetail;
  rentals: Rental[] = [];
  carImage: CarImage;
  imageBasePath = 'https://localhost:44352';
  currentImage: CarImage;
  dataLoaded = false;

  amountPaye: number = 0;
  customers: Customer[] = [];
  customerId: number;
  rentalId: number;
  userId: number;
  carId: number;
  carName: string;
  FirstName: string;
  LastName: string;
  companyName: string;
  rentDate: Date;
  returnDate: Date;
  dailyPrice: number;

  constructor(
    private carImageService: CarImageService,
    private carDetailService: CarDetailService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private paymentService: PaymentService
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

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  createRentalRequest(car: CarDetail) {
    if (this.customerId === undefined) {
      this.toastrService.warning('Bilgilerinizi kontrol ediniz.');
    } else if (this.rentDate === undefined || !this.rentDate) {
      this.toastrService.warning('Alış tarihini giriniz.');
    } else if (this.returnDate === undefined || !this.returnDate) {
      this.toastrService.warning('Teslim tarihini giriniz.');
    } else if (this.returnDate < this.rentDate) {
      this.toastrService.warning(
        'Teslim tarihi kiralanma tarihinden önce seçilemez'
      );
    } else if (this.returnDate == this.rentDate) {
      this.toastrService.warning('Alış tarihi ile teslim tarihi aynı olamaz.');
    } else {
      this.toastrService.info('Bilgileriniz kontrol ediliyor.');

      this.carId = car.carId;
      this.carName = car.carName;
      this.dailyPrice = car.dailyPrice;

      let carToBeRented: Rental = {
        carId: this.carId,
        customerId: this.customerId,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };

      this.rentalService.checkCarStatus(carToBeRented).subscribe(
        (response) => {
          this.toastrService.success(
            response.message.toString(),
            'Girilen tarih aralığı uygun'
          );

          let dateOfRent = new Date(this.rentDate.toString());
          let dateOfReturn = new Date(this.returnDate.toString());
          let difference = dateOfReturn.getTime() - dateOfReturn.getTime();
          let numberOfDay = Math.ceil(difference / (1000 * 3600 * 24));
          this.amountPaye = numberOfDay * this.dailyPrice;

          if (this.amountPaye <= 0) {
            this.route.navigate(['/cardetails/' + this.carId]);
            this.toastrService.error(
              'Araç secimi icin anasayfaya yönlendiriliyorsunuz'
            );
          } else {
            this.paymentService.setRental(carToBeRented, this.amountPaye);

            setTimeout(() => {
              this.toastrService.success('İşlem onaylandı.');
            }, 1000);
            setTimeout(() => {
              this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz!.');
            }, 1000);
            setTimeout(() => {
              this.route.navigate(['/payments']);
            }, 2000);
          }
        },
        (error) => {
          this.toastrService.error(
            'Seçilen tarihler için araba kiralanamaz.',
            'Kiralama başarısız'
          );
        }
      );
    }
  }
}
