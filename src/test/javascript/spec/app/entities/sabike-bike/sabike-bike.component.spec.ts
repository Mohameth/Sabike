/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEBikeComponent } from 'app/entities/sabike-bike/sabike-bike.component';
import { SABIKEBikeService } from 'app/entities/sabike-bike/sabike-bike.service';
import { SABIKEBike } from 'app/shared/model/sabike-bike.model';

describe('Component Tests', () => {
  describe('SABIKEBike Management Component', () => {
    let comp: SABIKEBikeComponent;
    let fixture: ComponentFixture<SABIKEBikeComponent>;
    let service: SABIKEBikeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEBikeComponent],
        providers: []
      })
        .overrideTemplate(SABIKEBikeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEBikeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEBikeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SABIKEBike(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sABIKEBikes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
