import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId, selectVersionId } from '@app/shared';

import { FetchVersionedItems, selectModuleId } from '../../state';

@Component({
  selector: 'rg-tree-editor',
  templateUrl: './tree-editor.component.html',
  styleUrls: ['./tree-editor.component.scss']
})
@AutoUnsubscribe()
export class TreeEditorComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  data$: Subscription;

  ngOnInit(): void {

    this.data$ = combineLatest(
      [
        this.store.select(selectVersionId),
        this.store.select(selectGameId),
        this.store.select(selectModuleId),
      ],
    ).pipe(
      map(([versionId]) => {
        this.store.dispatch(new FetchVersionedItems({ versionId, entityType: 'Module' }));
      })
    ).subscribe();
  }

}
