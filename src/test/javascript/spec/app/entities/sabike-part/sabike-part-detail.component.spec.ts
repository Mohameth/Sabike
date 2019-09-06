/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEPartDetailComponent } from 'app/entities/sabike-part/sabike-part-detail.component';
import { SABIKEPart } from 'app/shared/model/sabike-part.model';

describe('Component Tests', () => {
  describe('SABIKEPart Management Detail Component', () => {
    let comp: SABIKEPartDetailComponent;
    let fixture: ComponentFixture<SABIKEPartDetailComponent>;
    const route = ({ data: of({ sABIKEPart: new SABIKEPart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEPartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SABIKEPartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKEPartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sABIKEPart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
