/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECartDeleteDialogComponent } from 'app/entities/sabike-cart/sabike-cart-delete-dialog.component';
import { SABIKECartService } from 'app/entities/sabike-cart/sabike-cart.service';

describe('Component Tests', () => {
  describe('SABIKECart Management Delete Component', () => {
    let comp: SABIKECartDeleteDialogComponent;
    let fixture: ComponentFixture<SABIKECartDeleteDialogComponent>;
    let service: SABIKECartService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECartDeleteDialogComponent]
      })
        .overrideTemplate(SABIKECartDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKECartDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKECartService);
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
