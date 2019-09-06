/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEBikeDetailComponent } from 'app/entities/sabike-bike/sabike-bike-detail.component';
import { SABIKEBike } from 'app/shared/model/sabike-bike.model';

describe('Component Tests', () => {
  describe('SABIKEBike Management Detail Component', () => {
    let comp: SABIKEBikeDetailComponent;
    let fixture: ComponentFixture<SABIKEBikeDetailComponent>;
    const route = ({ data: of({ sABIKEBike: new SABIKEBike(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEBikeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SABIKEBikeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKEBikeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sABIKEBike).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
