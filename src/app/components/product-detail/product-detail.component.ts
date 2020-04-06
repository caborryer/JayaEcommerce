import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {
  public products: {
    id: string;
    seller: string;
    name: string;
    image: string;
    description: string;
    units: number;
    price: number;
  } = {
    id: '1',
    name: 'Product one',
    image: 'https://http2.mlstatic.com/D_NQ_NP_770026-MCO40460026819_012020-O.jpg',
    seller: 'Sam',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
    units: 2,
    price: 22
  };

  constructor() { }

  ngOnInit(): void {
  }

}
