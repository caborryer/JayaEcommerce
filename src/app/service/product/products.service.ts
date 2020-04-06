import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageS: string;
  imageL: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = "products";


  constructor() { }
}
