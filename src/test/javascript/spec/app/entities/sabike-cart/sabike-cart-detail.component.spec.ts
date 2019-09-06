/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECartDetailComponent } from 'app/entities/sabike-cart/sabike-cart-detail.component';
import { SABIKECart } from 'app/shared/model/sabike-cart.model';

describe('Component Tests', () => {
  describe('SABIKECart Management Detail Component', () => {
    let comp: SABIKECartDetailComponent;
    let fixture: ComponentFixture<SABIKECartDetailComponent>;
    const route = ({ data: of({ sABIKECart: new SABIKECart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SABIKECartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKECartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sABIKECart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
