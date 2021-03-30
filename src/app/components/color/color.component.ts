import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { Filters } from 'src/app/models/filters';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  currentColor: Color;
  colorFilterText = '';
  Filters = {brandId: '', colorId: ''};
  constructor(
    private colorService: ColorService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentColor() {
    this.currentColor !== undefined
      ? (Filters.colorId = this.currentColor.colorId)
      : (Filters.colorId = null);
  }
  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
  getAllColorClass() {
    return this.currentColor == undefined ? true : false;
  }
}
