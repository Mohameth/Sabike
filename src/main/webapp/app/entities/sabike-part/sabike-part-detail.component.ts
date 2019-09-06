import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISABIKEPart } from 'app/shared/model/sabike-part.model';

@Component({
  selector: 'jhi-sabike-part-detail',
  templateUrl: './sabike-part-detail.component.html'
})
export class SABIKEPartDetailComponent implements OnInit {
  sABIKEPart: ISABIKEPart;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEPart }) => {
      this.sABIKEPart = sABIKEPart;
    });
  }

  previousState() {
    window.history.back();
  }
}
