import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISABIKECommande } from 'app/shared/model/sabike-commande.model';
import { SABIKECommandeService } from './sabike-commande.service';

@Component({
  selector: 'jhi-sabike-commande-delete-dialog',
  templateUrl: './sabike-commande-delete-dialog.component.html'
})
export class SABIKECommandeDeleteDialogComponent {
  sABIKECommande: ISABIKECommande;

  constructor(
    protected sABIKECommandeService: SABIKECommandeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sABIKECommandeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sABIKECommandeListModification',
        content: 'Deleted an sABIKECommande'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sabike-commande-delete-popup',
  template: ''
})
export class SABIKECommandeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKECommande }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SABIKECommandeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sABIKECommande = sABIKECommande;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sabike-commande', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sabike-commande', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
