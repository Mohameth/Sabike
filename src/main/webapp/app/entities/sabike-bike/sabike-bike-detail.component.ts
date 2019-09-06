import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISABIKEBike } from 'app/shared/model/sabike-bike.model';

@Component({
  selector: 'jhi-sabike-bike-detail',
  templateUrl: './sabike-bike-detail.component.html'
})
export class SABIKEBikeDetailComponent implements OnInit {
  sABIKEBike: ISABIKEBike;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEBike }) => {
      this.sABIKEBike = sABIKEBike;
    });
  }

  previousState() {
    window.history.back();
  }
}
