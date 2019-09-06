/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEArticleComponent } from 'app/entities/sabike-article/sabike-article.component';
import { SABIKEArticleService } from 'app/entities/sabike-article/sabike-article.service';
import { SABIKEArticle } from 'app/shared/model/sabike-article.model';

describe('Component Tests', () => {
  describe('SABIKEArticle Management Component', () => {
    let comp: SABIKEArticleComponent;
    let fixture: ComponentFixture<SABIKEArticleComponent>;
    let service: SABIKEArticleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEArticleComponent],
        providers: []
      })
        .overrideTemplate(SABIKEArticleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEArticleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEArticleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SABIKEArticle(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sABIKEArticles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
