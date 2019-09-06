/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEArticleUpdateComponent } from 'app/entities/sabike-article/sabike-article-update.component';
import { SABIKEArticleService } from 'app/entities/sabike-article/sabike-article.service';
import { SABIKEArticle } from 'app/shared/model/sabike-article.model';

describe('Component Tests', () => {
  describe('SABIKEArticle Management Update Component', () => {
    let comp: SABIKEArticleUpdateComponent;
    let fixture: ComponentFixture<SABIKEArticleUpdateComponent>;
    let service: SABIKEArticleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEArticleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SABIKEArticleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEArticleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEArticleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SABIKEArticle(123);
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
        const entity = new SABIKEArticle();
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
