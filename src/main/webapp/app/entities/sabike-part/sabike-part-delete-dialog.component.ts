import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISABIKEPart } from 'app/shared/model/sabike-part.model';
import { SABIKEPartService } from './sabike-part.service';

@Component({
  selector: 'jhi-sabike-part-delete-dialog',
  templateUrl: './sabike-part-delete-dialog.component.html'
})
export class SABIKEPartDeleteDialogComponent {
  sABIKEPart: ISABIKEPart;

  constructor(
    protected sABIKEPartService: SABIKEPartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sABIKEPartService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sABIKEPartListModification',
        content: 'Deleted an sABIKEPart'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sabike-part-delete-popup',
  template: ''
})
export class SABIKEPartDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEPart }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SABIKEPartDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sABIKEPart = sABIKEPart;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sabike-part', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sabike-part', { outlets: { popup: null } }]);
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
