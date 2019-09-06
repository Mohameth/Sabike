/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECommandeDeleteDialogComponent } from 'app/entities/sabike-commande/sabike-commande-delete-dialog.component';
import { SABIKECommandeService } from 'app/entities/sabike-commande/sabike-commande.service';

describe('Component Tests', () => {
  describe('SABIKECommande Management Delete Component', () => {
    let comp: SABIKECommandeDeleteDialogComponent;
    let fixture: ComponentFixture<SABIKECommandeDeleteDialogComponent>;
    let service: SABIKECommandeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECommandeDeleteDialogComponent]
      })
        .overrideTemplate(SABIKECommandeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKECommandeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKECommandeService);
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
