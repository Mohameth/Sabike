import { Component, Input, OnInit } from '@angular/core';
import { Command } from 'app/shared/model/command.model';
import { OrderItemsService } from 'app/entities/order-items';

@Component({
  selector: 'jhi-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
  @Input() orderList: Command[];

  constructor(private or: OrderItemsService) {}

  ngOnInit() {}
}
