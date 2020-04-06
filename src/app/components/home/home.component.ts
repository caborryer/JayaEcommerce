import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public products: {
    id: string;
    name: string;
    image: string;
  }[] = [
    {
      id: '1',
      name: 'Product one',
      image: 'https://http2.mlstatic.com/D_NQ_NP_770026-MCO40460026819_012020-O.jpg'
    },
    {
      id: '2',
      name: 'Product two',
      image: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-CherryTtomatoes.jpg'
    },
    {
      id: '3',
      name: 'Product three',
      image: 'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-CherryTtomatoes.jpg'
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
