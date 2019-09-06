/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKEUserDetailComponent } from 'app/entities/sabike-user/sabike-user-detail.component';
import { SABIKEUser } from 'app/shared/model/sabike-user.model';

describe('Component Tests', () => {
  describe('SABIKEUser Management Detail Component', () => {
    let comp: SABIKEUserDetailComponent;
    let fixture: ComponentFixture<SABIKEUserDetailComponent>;
    const route = ({ data: of({ sABIKEUser: new SABIKEUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKEUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SABIKEUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKEUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sABIKEUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
