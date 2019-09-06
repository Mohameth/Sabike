import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';
import { SABIKEArticleService } from './sabike-article.service';

@Component({
  selector: 'jhi-sabike-article-delete-dialog',
  templateUrl: './sabike-article-delete-dialog.component.html'
})
export class SABIKEArticleDeleteDialogComponent {
  sABIKEArticle: ISABIKEArticle;

  constructor(
    protected sABIKEArticleService: SABIKEArticleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sABIKEArticleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sABIKEArticleListModification',
        content: 'Deleted an sABIKEArticle'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sabike-article-delete-popup',
  template: ''
})
export class SABIKEArticleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEArticle }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SABIKEArticleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sABIKEArticle = sABIKEArticle;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sabike-article', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sabike-article', { outlets: { popup: null } }]);
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
