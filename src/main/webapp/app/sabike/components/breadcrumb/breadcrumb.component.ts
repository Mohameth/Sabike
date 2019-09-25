import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'app/sabike/services/navigation-service';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'jhi-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private navigationService: NavigationService) {
    this.navigationService.listenBreadcrumb().subscribe(message => {
      this.breadcrumbs = message;
    });
  }

  ngOnInit() {}
}
