import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISABIKEUser } from 'app/shared/model/sabike-user.model';
import { SABIKEUserService } from './sabike-user.service';

@Component({
  selector: 'jhi-sabike-user-delete-dialog',
  templateUrl: './sabike-user-delete-dialog.component.html'
})
export class SABIKEUserDeleteDialogComponent {
  sABIKEUser: ISABIKEUser;

  constructor(
    protected sABIKEUserService: SABIKEUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sABIKEUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sABIKEUserListModification',
        content: 'Deleted an sABIKEUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sabike-user-delete-popup',
  template: ''
})
export class SABIKEUserDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SABIKEUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sABIKEUser = sABIKEUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sabike-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sabike-user', { outlets: { popup: null } }]);
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
