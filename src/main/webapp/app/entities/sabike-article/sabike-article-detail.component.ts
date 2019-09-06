import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISABIKEArticle } from 'app/shared/model/sabike-article.model';

@Component({
  selector: 'jhi-sabike-article-detail',
  templateUrl: './sabike-article-detail.component.html'
})
export class SABIKEArticleDetailComponent implements OnInit {
  sABIKEArticle: ISABIKEArticle;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sABIKEArticle }) => {
      this.sABIKEArticle = sABIKEArticle;
    });
  }

  previousState() {
    window.history.back();
  }
}
