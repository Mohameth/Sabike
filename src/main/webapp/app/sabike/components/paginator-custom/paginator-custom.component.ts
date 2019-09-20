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
  @Input() pageSizeOptions: number[] = [1, 2, 5, 50];
  @Input() bindedPaginator;
  event: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  // MatPaginator Output
  pageEvent: PageEvent;

  setBindedPaginator() {}

  ngOnInit(): void {
    //this.pageEvent.
  }

  getPaginatorData($event: PageEvent) {
    this.event.emit($event);
  }
}
