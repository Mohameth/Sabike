/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECommandeDetailComponent } from 'app/entities/sabike-commande/sabike-commande-detail.component';
import { SABIKECommande } from 'app/shared/model/sabike-commande.model';

describe('Component Tests', () => {
  describe('SABIKECommande Management Detail Component', () => {
    let comp: SABIKECommandeDetailComponent;
    let fixture: ComponentFixture<SABIKECommandeDetailComponent>;
    const route = ({ data: of({ sABIKECommande: new SABIKECommande(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECommandeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SABIKECommandeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SABIKECommandeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sABIKECommande).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
