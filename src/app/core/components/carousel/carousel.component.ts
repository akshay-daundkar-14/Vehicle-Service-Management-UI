import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  _imagePath_EngineOil?:string;
  _imagePath_CarService?:string;
  _imagePath_TireChange?:string;

  constructor(){
    this._imagePath_EngineOil   = "/assets/images/engineoil.jpg";
    this._imagePath_CarService   = "/assets/images/carservice.jpg";
    this._imagePath_TireChange   = "/assets/images/tyrechange.jpg";
  }


  

}
