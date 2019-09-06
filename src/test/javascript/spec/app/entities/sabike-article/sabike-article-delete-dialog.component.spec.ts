/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEArticleDeleteDialogComponent } from 'app/entities/sabike-article/sabike-article-delete-dialog.component';
import { SABIKEArticleService } from 'app/entities/sabike-article/sabike-article.service';

describe('Component Tests', () => {
  describe('SABIKEArticle Management Delete Component', () => {
    let comp: SABIKEArticleDeleteDialogComponent;
    let fixture: ComponentFixture<SABIKEArticleDeleteDialogComponent>;
    let service: SABIKEArticleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEArticleDeleteDialogComponent]
      })
        .overrideTemplate(SABIKEArticleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKEArticleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEArticleService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
