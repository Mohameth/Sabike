/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECartUpdateComponent } from 'app/entities/sabike-cart/sabike-cart-update.component';
import { SABIKECartService } from 'app/entities/sabike-cart/sabike-cart.service';
import { SABIKECart } from 'app/shared/model/sabike-cart.model';

describe('Component Tests', () => {
  describe('SABIKECart Management Update Component', () => {
    let comp: SABIKECartUpdateComponent;
    let fixture: ComponentFixture<SABIKECartUpdateComponent>;
    let service: SABIKECartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECartUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SABIKECartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKECartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKECartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKECart(123);
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
        const entity = new SABIKECart();
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
