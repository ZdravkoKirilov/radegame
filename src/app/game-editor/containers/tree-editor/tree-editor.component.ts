import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId, selectVersionId } from '@app/shared';
import { GameId } from '@app/game-mechanics';

import { FetchVersionedItems } from '../../state';

@Component({
  selector: 'rg-tree-editor',
  templateUrl: './tree-editor.component.html',
  styleUrls: ['./tree-editor.component.scss']
})
@AutoUnsubscribe()
export class TreeEditorComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  data$: Subscription;
  gameId: GameId;

  ngOnInit(): void {

    this.data$ = combineLatest(
      this.store.select(selectGameId),
      this.store.select(selectVersionId),
    ).pipe(
      filter(data => data.every(Boolean)),
      map(([gameId, versionId]) => {
        this.gameId = gameId;
        this.store.dispatch(new FetchVersionedItems({ versionId, entityType: 'Module' }));
      })
    ).subscribe();
  }

}
