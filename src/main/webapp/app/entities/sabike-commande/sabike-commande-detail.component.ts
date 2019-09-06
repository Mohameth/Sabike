import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';

@Component({
  selector: 'jhi-sabike-commande-detail',
  templateUrl: './sabike-commande-detail.component.html'
})
export class SABIKECommandeDetailComponent implements OnInit {
  sABIKECommande: ISABIKECommande;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKECommande }) => {
      this.sABIKECommande = sABIKECommande;
    });
  }

  previousState() {
    window.history.back();
  }
}
