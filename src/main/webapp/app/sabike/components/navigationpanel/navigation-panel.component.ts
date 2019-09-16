import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { sabike_paths } from './navigation-nodes';
import { NavigationService } from 'app/sabike/services/navigation-service';
import { Router } from '@angular/router';

/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'jhi-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss']
})
export class NavigationPanelComponent {
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private navigationService: NavigationService, private router: Router) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = sabike_paths;

    // this.navigationService.listenNavigation().subscribe(message => {
    //   // console.log('recu le message ', message);
    //   // console.log(this.dataSource.data[0]);
    //   // console.log(this.treeControl.dataNodes);
    //   // this.treeControl.expandAll();
    //   this.treeControl.dataNodes.forEach(cb => {
    //     console.log(cb);
    //   });
    //   // TODO use the message diretly to find the good one
    //   if (message === 'velos') {
    //     this.treeControl.expand(this.treeControl.dataNodes.find(n => n.name === 'Vélos'));
    //   } else {
    //     this.treeControl.expand(this.treeControl.dataNodes.find(n => n.name === 'Pièces'));
    //   }
    // });

    this.navigationService.listenSubject().subscribe(message => {
      console.log('hiding fields', message);
      if (message) {
        document.getElementById('nav-left-root-label-filters').style.display = 'none';
      } else {
        document.getElementById('nav-left-root-label-filters').style.display = 'block';
      }
    });
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number) {
    return {
      name: node.name,
      type: node.type,
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

  onListClick(item) {
    // this.treeControl.collapseAll();
  }

  /**
   * On devrait cacher les filtres si on est pas en train de regarder des articles.
   */
  shouldHideFilters() {
    return this.router.url.startsWith('/articles/', 0);
  }
}
