/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECommandeUpdateComponent } from 'app/entities/sabike-commande/sabike-commande-update.component';
import { SABIKECommandeService } from 'app/entities/sabike-commande/sabike-commande.service';
import { SABIKECommande } from 'app/shared/model/sabike-commande.model';

describe('Component Tests', () => {
  describe('SABIKECommande Management Update Component', () => {
    let comp: SABIKECommandeUpdateComponent;
    let fixture: ComponentFixture<SABIKECommandeUpdateComponent>;
    let service: SABIKECommandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECommandeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SABIKECommandeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKECommandeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKECommandeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKECommande(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKECommande();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
