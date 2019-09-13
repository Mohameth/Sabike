/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { OrderItemsUpdateComponent } from 'app/entities/order-items/order-items-update.component';
import { OrderItemsService } from 'app/entities/order-items/order-items.service';
import { OrderItems } from 'app/shared/model/order-items.model';

describe('Component Tests', () => {
  describe('OrderItems Management Update Component', () => {
    let comp: OrderItemsUpdateComponent;
    let fixture: ComponentFixture<OrderItemsUpdateComponent>;
    let service: OrderItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [OrderItemsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderItemsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderItemsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderItemsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderItems(123);
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
        const entity = new OrderItems();
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
