import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from '@app/core';
import { formKeys, FetchItemsAction, selectGameId } from '../../state';
import { selectUser } from '@app/profile';

@Component({
  selector: 'rg-editor-container',
  templateUrl: './editor.container.html',
  styleUrls: ['./editor.container.scss']
})
export class EditorContainerComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private hasLoaded = false;

  gameId: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.sub = combineLatest(
      this.store.pipe(select(selectUser)),
      this.store.pipe(select(selectGameId))
    ).pipe(
      tap(([user, gameId]) => {
        this.gameId = gameId;

        this.store.dispatch(new FetchItemsAction({ key: formKeys.GAMES, data: user ? user.id : null }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.ACTIONS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.CHOICES, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.CONDITIONS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.FACTIONS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.FIELDS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.ROUNDS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.STAGES, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.PATHS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.SLOTS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.TOKENS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.PHASES, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.TEAMS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.SOURCES, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.IMAGES, data: gameId }));
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get backURL() {
    return `/games/${this.gameId}/editor`;
  }

}
