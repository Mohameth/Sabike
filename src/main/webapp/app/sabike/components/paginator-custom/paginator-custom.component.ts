import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'jhi-paginator-custom',
  templateUrl: './paginator-custom.component.html',
  styleUrls: ['./paginator-custom.component.scss']
})
export class PaginatorCustomComponent implements OnInit {
  // MatPaginator Inputs
  @Input() length = 100;
  @Input() pageSize = 10;
  @Input() mainPaginator: boolean = false;
  @Input() pageSizeOptions: number[] = [1, 2, 5, 50];
  @Input() bindedPaginator: PaginatorCustomComponent;
  event: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  setBindedPaginator() {}

  ngOnInit(): void {}

  getPaginatorData($event: PageEvent) {
    this.bindedPaginator.handleEventFromOtherPaginator($event);
    // The list item only listen to the main paginator
    if (this.mainPaginator) this.event.emit($event);
    else this.bindedPaginator.event.emit($event);
  }

  handleEventFromOtherPaginator($event: PageEvent) {
    this.length = $event.length;
    this.pageSize = $event.pageSize;
  }

  setLength(length: number) {
    this.length = length;
    this.bindedPaginator.length = length;
  }
}
