/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECartComponent } from 'app/entities/sabike-cart/sabike-cart.component';
import { SABIKECartService } from 'app/entities/sabike-cart/sabike-cart.service';
import { SABIKECart } from 'app/shared/model/sabike-cart.model';

describe('Component Tests', () => {
  describe('SABIKECart Management Component', () => {
    let comp: SABIKECartComponent;
    let fixture: ComponentFixture<SABIKECartComponent>;
    let service: SABIKECartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECartComponent],
        providers: []
      })
        .overrideTemplate(SABIKECartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKECartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKECartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SABIKECart(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sABIKECarts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
