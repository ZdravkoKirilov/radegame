import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import { map, filter } from 'rxjs/operators';
import { GameId } from '@app/game-mechanics';

import { FetchGameData, FetchGameDetails, FetchItemsAction } from '../../state';

@Component({
  selector: 'rg-tree-editor',
  templateUrl: './tree-editor.component.html',
  styleUrls: ['./tree-editor.component.scss']
})
@AutoUnsubscribe()
export class TreeEditorComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  gameId$: Subscription;

  ngOnInit(): void {
    this.gameId$ = this.store.pipe(
      select(selectGameId),
      filter<GameId>(Boolean),
      map(gameId => {
        this.store.dispatch(new FetchGameData({ gameId }));
        this.store.dispatch(new FetchGameDetails({ gameId }));
        this.store.dispatch(new FetchItemsAction({ key: 'modules', data: { gameId } }));
      })
    ).subscribe();
  }

}
