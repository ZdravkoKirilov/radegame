import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@app/core';
import { Module, ALL_ENTITIES } from '@app/game-mechanics';
import { getItems } from 'app/game-editor/state';

@Component({
  selector: 'rg-tree-explorer',
  templateUrl: './tree-explorer.component.html',
  styleUrls: ['./tree-explorer.component.scss']
})
export class TreeExplorerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  modules$: Observable<Module[]>;

  ngOnInit() {
    this.modules$ = this.store.pipe(select(getItems<Module>(ALL_ENTITIES.modules)));
  }

}
