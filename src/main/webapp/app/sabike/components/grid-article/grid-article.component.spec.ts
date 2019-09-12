import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridArticleComponent } from './grid-article.component';

describe('GridArticleComponent', () => {
  let component: GridArticleComponent;
  let fixture: ComponentFixture<GridArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridArticleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
