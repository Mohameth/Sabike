import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISABIKECart } from 'app/shared/model/sabike-cart.model';
import { SABIKECartService } from './sabike-cart.service';

@Component({
  selector: 'jhi-sabike-cart-delete-dialog',
  templateUrl: './sabike-cart-delete-dialog.component.html'
})
export class SABIKECartDeleteDialogComponent {
  sABIKECart: ISABIKECart;

  constructor(
    protected sABIKECartService: SABIKECartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sABIKECartService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sABIKECartListModification',
        content: 'Deleted an sABIKECart'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sabike-cart-delete-popup',
  template: ''
})
export class SABIKECartDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKECart }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SABIKECartDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sABIKECart = sABIKECart;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sabike-cart', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sabike-cart', { outlets: { popup: null } }]);
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
