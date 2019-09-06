import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISABIKEUser } from 'app/shared/model/sabike-user.model';

@Component({
  selector: 'jhi-sabike-user-detail',
  templateUrl: './sabike-user-detail.component.html'
})
export class SABIKEUserDetailComponent implements OnInit {
  sABIKEUser: ISABIKEUser;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEUser }) => {
      this.sABIKEUser = sABIKEUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
