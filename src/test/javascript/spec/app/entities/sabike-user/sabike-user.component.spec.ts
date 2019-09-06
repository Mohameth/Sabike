/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEUserComponent } from 'app/entities/sabike-user/sabike-user.component';
import { SABIKEUserService } from 'app/entities/sabike-user/sabike-user.service';
import { SABIKEUser } from 'app/shared/model/sabike-user.model';

describe('Component Tests', () => {
  describe('SABIKEUser Management Component', () => {
    let comp: SABIKEUserComponent;
    let fixture: ComponentFixture<SABIKEUserComponent>;
    let service: SABIKEUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEUserComponent],
        providers: []
      })
        .overrideTemplate(SABIKEUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKEUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKEUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SABIKEUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sABIKEUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
