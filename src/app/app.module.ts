import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarComponent,
    SidebarComponent,
    RentalComponent,
    CarFilterPipe,
    ColorFilterPipe,
    BrandFilterPipe,
    CarDetailComponent,
    CartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({})
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
