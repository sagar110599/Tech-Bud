import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product';
import { environment } from '../../environments/environment';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = {
    name: 'Name',
    url: 'https://localhost:4200',
    image: 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png',
    price: "999",
    site: "xyz"
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
