/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEPartComponent } from 'app/entities/sabike-part/sabike-part.component';
import { SABIKEPartService } from 'app/entities/sabike-part/sabike-part.service';
import { SABIKEPart } from 'app/shared/model/sabike-part.model';

describe('Component Tests', () => {
  describe('SABIKEPart Management Component', () => {
    let comp: SABIKEPartComponent;
    let fixture: ComponentFixture<SABIKEPartComponent>;
    let service: SABIKEPartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEPartComponent],
        providers: []
      })
        .overrideTemplate(SABIKEPartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEPartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEPartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SABIKEPart(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sABIKEParts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
