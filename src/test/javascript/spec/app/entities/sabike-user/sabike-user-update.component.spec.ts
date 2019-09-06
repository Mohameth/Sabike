/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEUserUpdateComponent } from 'app/entities/sabike-user/sabike-user-update.component';
import { SABIKEUserService } from 'app/entities/sabike-user/sabike-user.service';
import { SABIKEUser } from 'app/shared/model/sabike-user.model';

describe('Component Tests', () => {
  describe('SABIKEUser Management Update Component', () => {
    let comp: SABIKEUserUpdateComponent;
    let fixture: ComponentFixture<SABIKEUserUpdateComponent>;
    let service: SABIKEUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SABIKEUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKEUser(123);
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
        const entity = new SABIKEUser();
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
