/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEArticleDetailComponent } from 'app/entities/sabike-article/sabike-article-detail.component';
import { SABIKEArticle } from 'app/shared/model/sabike-article.model';

describe('Component Tests', () => {
  describe('SABIKEArticle Management Detail Component', () => {
    let comp: SABIKEArticleDetailComponent;
    let fixture: ComponentFixture<SABIKEArticleDetailComponent>;
    const route = ({ data: of({ sABIKEArticle: new SABIKEArticle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEArticleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SABIKEArticleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKEArticleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sABIKEArticle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
