/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEBikeUpdateComponent } from 'app/entities/sabike-bike/sabike-bike-update.component';
import { SABIKEBikeService } from 'app/entities/sabike-bike/sabike-bike.service';
import { SABIKEBike } from 'app/shared/model/sabike-bike.model';

describe('Component Tests', () => {
  describe('SABIKEBike Management Update Component', () => {
    let comp: SABIKEBikeUpdateComponent;
    let fixture: ComponentFixture<SABIKEBikeUpdateComponent>;
    let service: SABIKEBikeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEBikeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SABIKEBikeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEBikeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEBikeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKEBike(123);
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
        const entity = new SABIKEBike();
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
