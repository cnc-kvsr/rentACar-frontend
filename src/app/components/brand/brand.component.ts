import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  brand:Brand[]=[];
  currentBrand: Brand;
  dataLoaded=false;
  brandFilterText = '';
  Filters = {};
  
  constructor(
    private brandService: BrandService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) {}
 
  

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }
  setCurrentBrand() {
    this.currentBrand !==undefined
    ?(Filters.brandId=this.currentBrand.brandId)
    :(Filters.brandId=null);
  }
  getCurrentBrandClass(brand: Brand) {
    if(brand==this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
 
  getAllBrandClass(){
    return this.currentBrand==undefined ? true:false;
  }
  
}
