import { Component, Input, OnInit } from '@angular/core';
import { IOrderItems, OrderItems } from 'app/shared/model/order-items.model';
import { CommandService } from 'app/entities/command';

@Component({
  selector: 'jhi-item-list-cart',
  templateUrl: './item-list-cart.component.html',
  styleUrls: ['./item-list-cart.component.scss']
})
export class ItemListCartComponent implements OnInit {
  selectedQuantity = '1'; // default
  @Input() orderItem: OrderItems;

  constructor(private commandService: CommandService) {}

  ngOnInit(): void {
    this.selectedQuantity = this.orderItem.quantity.toString();
    console.log('SELECTED QTE :', this.selectedQuantity);
    console.log('orderitems string :', this.orderItem.quantity.toString());
  }

  changeQuantity($newQuantity: any) {
    this.commandService.updateToCart(this.orderItem.product, Number($newQuantity));
    // this.commandService.updateToCart(this.orderItem.product, parseInt($newQuantity));
    // this.orderItem.quantity = $newQuantity;
    console.log('new QTE :', this.orderItem.quantity);
    console.log('type qte', typeof $newQuantity);
  }
}
