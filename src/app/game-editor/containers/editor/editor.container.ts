import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState, selectGameId } from '@app/core';
import { formKeys, FetchItemsAction } from '../../state';
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
        this.store.dispatch(new FetchItemsAction({ key: formKeys.RESOURCES, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.ROUNDS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.STAGES, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.PATHS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.LOCATIONS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.EFFECT_GROUPS, data: gameId }));
        this.store.dispatch(new FetchItemsAction({ key: formKeys.EFFECT_STACKS, data: gameId }));
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
