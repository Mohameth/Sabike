import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-item-list-cart',
  templateUrl: './item-list-cart.component.html',
  styleUrls: ['./item-list-cart.component.scss']
})
export class ItemListCartComponent implements OnInit {
  selectedQuantity: '1'; // default

  constructor() {}

  ngOnInit() {}
}
