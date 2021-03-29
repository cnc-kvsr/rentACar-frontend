import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private sidebarRouter:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  setRoute(){
    if(Filters['brandId'] && Filters['colorId']){
      this.sidebarRouter.navigate([
        `cars/brand/${Filters.brandId}/color/${Filters.colorId}`,
      ]);
      console.log("siledar brand color:"+Filters.brandId+"-"+Filters.colorId);
    }
    else if(Filters['brandId']){
      this.sidebarRouter.navigate([`cars/brand/${Filters.brandId}`]);
      console.log("siledar brand:"+Filters.brandId);
    }
    else if(Filters['colorId']){
      this.sidebarRouter.navigate([`cars/color/${Filters.colorId}`]);
      console.log("siledar color:"+Filters.colorId);
    }
    else{
      this.sidebarRouter.navigate([`cars/`]);
      console.log("siledar setRoute boş");
    }
  }

  clearRoute(){
    this.sidebarRouter.navigate([`cars/`]);
    console.log("siledar clearRoute");
  }

}
