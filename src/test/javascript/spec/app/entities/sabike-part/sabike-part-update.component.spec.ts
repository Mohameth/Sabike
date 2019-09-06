/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEPartUpdateComponent } from 'app/entities/sabike-part/sabike-part-update.component';
import { SABIKEPartService } from 'app/entities/sabike-part/sabike-part.service';
import { SABIKEPart } from 'app/shared/model/sabike-part.model';

describe('Component Tests', () => {
  describe('SABIKEPart Management Update Component', () => {
    let comp: SABIKEPartUpdateComponent;
    let fixture: ComponentFixture<SABIKEPartUpdateComponent>;
    let service: SABIKEPartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEPartUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SABIKEPartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEPartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEPartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKEPart(123);
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
        const entity = new SABIKEPart();
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
