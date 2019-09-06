/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SabikeTestModule } from '../../../test.module';
import { SABIKECommandeComponent } from 'app/entities/sabike-commande/sabike-commande.component';
import { SABIKECommandeService } from 'app/entities/sabike-commande/sabike-commande.service';
import { SABIKECommande } from 'app/shared/model/sabike-commande.model';

describe('Component Tests', () => {
  describe('SABIKECommande Management Component', () => {
    let comp: SABIKECommandeComponent;
    let fixture: ComponentFixture<SABIKECommandeComponent>;
    let service: SABIKECommandeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SabikeTestModule],
        declarations: [SABIKECommandeComponent],
        providers: []
      })
        .overrideTemplate(SABIKECommandeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SABIKECommandeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SABIKECommandeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SABIKECommande(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sABIKECommandes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
