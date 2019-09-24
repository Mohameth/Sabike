import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { sabike_paths } from './navigation-nodes';
import { NavigationService } from 'app/sabike/services/navigation-service';
import { NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from 'app/sabike/components/breadcrumb/breadcrumb.component';
import { Filter, FilterLabels, FilterService } from 'app/sabike/services/filter.service';
import { MatCheckbox } from '@angular/material/checkbox';

/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  route: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  route: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'jhi-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent implements OnInit {
  public activeNode;
  public bikeFiltersLabels: FilterLabels = new FilterLabels();

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private navigationService: NavigationService, private router: Router, private filterService: FilterService) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = sabike_paths;

    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        console.log('####', routerEvent);
        this.navigationService.handleBreadcrumb(this.buildBreads());
        this.selectActiveNode(this.findNodeWithRoute(this.router.url.split('/').reverse()[0]));
      }
    });

    /*routerEventService.listenNavigationEndEvent().subscribe(m => {
      console.log(' Trying to handle breadcrumbs ', m);
      //this.navigationService.handleBreadcrumb(this.buildBreads());
    });*/

    this.navigationService.listenSubject().subscribe(message => {
      console.log('Handling the display of filters', message);
      if (document.getElementById('nav-left-root-label-filters')) {
        if (message == null) {
          document.getElementById('nav-left-root-label-filters').style.display = 'none';
        } else {
          document.getElementById('nav-left-root-label-filters').style.display = 'block';
          if (message === 'bike')
            if (document.getElementById('nav-left-root-filter-bike'))
              document.getElementById('nav-left-root-filter-bike').style.display = 'block';
        }
      }
    });

    this.navigationService.listenNavigation().subscribe(message => {
      if (message === 'bikes' || message === 'parts') {
        this.expand(message);
      } else {
        console.log('We are in the nav component, weird message', message);
      }
    });
  }

  ngOnInit() {
    this.filterService.listenBikeFiltersLabels().subscribe(m => {
      console.log('Ok filters labels => ', m);
      this.bikeFiltersLabels = m;
    });
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
      route: node.route,
      level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode) {
    return observableOf(node.children);
  }

  /** Creation of a list of breadcrumb from the node information */
  buildBreads(): Breadcrumb[] {
    let currentNode: FlatTreeNode;
    let routeName: string;
    const breads: Breadcrumb[] = [];
    let i = 0;

    const max = 6;
    const routeChunks = this.router.url.split('/').reverse();

    while ((routeName = routeChunks[i]) !== 'articles' && i < max) {
      currentNode = this.findNodeWithRoute(routeName);
      if (currentNode === undefined) {
        i = max;
        continue;
      }
      const bread: Breadcrumb = {
        label: currentNode.name,
        url: currentNode.route
      };

      breads.push(bread);
      i++;
    }
    return breads.reverse();
  }

  selectActiveNode(currentNode: FlatTreeNode) {
    // this.treeControl.collapseAll();
    // this.treeControl.expand(currentNode);
    // while (parent = this.treeControl.)
    // this.treeControl.toggle(currentNode);
    this.activeNode = currentNode;
  }

  /** Use the treeControl and compare names ignoring cases (only the first is considered) */
  findNodeWithName(nodeName: String): FlatTreeNode {
    return this.treeControl.dataNodes.find(node => node.name.toLowerCase() === nodeName.toLowerCase());
  }

  findNodeWithRoute(nodeRoute: String): FlatTreeNode {
    return this.treeControl.dataNodes.find(
      node =>
        node.route
          .split('/')
          .reverse()[0]
          .toLowerCase() === nodeRoute.toLowerCase()
    );
  }

  expand(nodeName: String) {
    this.treeControl.collapseAll();
    const node: FlatTreeNode = this.findNodeWithName(nodeName);
    this.treeControl.expand(node);
  }

  onListClick(item) {
    // this.treeControl.collapseAll();
  }

  /**
   * On devrait cacher les filtres si on est pas en train de regarder des articles.
   */
  shouldShowGlobalFilters() {
    return this.router.url.startsWith('/articles/');
  }

  shouldShowBikeFilters() {
    return this.router.url.startsWith('/articles/bikes');
  }

  applyFilters(minPrice?, maxPrice?, inStock = null) {
    let filter: Filter = new Filter();
    if (minPrice) filter.minPrice = minPrice;
    if (maxPrice) filter.maxPrice = maxPrice;

    if (inStock) filter.inStock = true;

    this.filterService.handleFilter(filter);
  }

  applyColorFilter(color, event) {
    let filter: Filter = new Filter();
    if (event.checked) {
      filter.bikeColor = color;
    } else {
      filter.bikeColor = null;
    }
    this.filterService.handleFilter(filter);
  }

  applySizeFilter(size, event) {
    let filter: Filter = new Filter();
    if (event.checked) {
      filter.bikeSize = size;
    } else {
      filter.bikeSize = null;
    }
    this.filterService.handleFilter(filter);
  }
}
