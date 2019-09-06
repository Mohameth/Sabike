import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISABIKEBike } from 'app/shared/model/sabike-bike.model';
import { SABIKEBikeService } from './sabike-bike.service';

@Component({
  selector: 'jhi-sabike-bike-delete-dialog',
  templateUrl: './sabike-bike-delete-dialog.component.html'
})
export class SABIKEBikeDeleteDialogComponent {
  sABIKEBike: ISABIKEBike;

  constructor(
    protected sABIKEBikeService: SABIKEBikeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sABIKEBikeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sABIKEBikeListModification',
        content: 'Deleted an sABIKEBike'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sabike-bike-delete-popup',
  template: ''
})
export class SABIKEBikeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEBike }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SABIKEBikeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sABIKEBike = sABIKEBike;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sabike-bike', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sabike-bike', { outlets: { popup: null } }]);
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
