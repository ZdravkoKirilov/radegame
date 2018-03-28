import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { AppState, selectGameId, selectGameAssets, selectPreloadedGames } from '../../../core';
import { GameTemplate } from '../../../game-mechanics';
import * as actions from '../../state/actions';
import { SetAllItemsAction, SetItemAction, SetItemsAction, ChangeSelectedItemAction, formKeys } from '../../state/actions/generics';

@Component({
  selector: 'rg-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private hasLoaded = false;
  public gameId: number;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {

    this.subs = [
      this.store.subscribe(state => {
        if (!this.hasLoaded) {
          this.hasLoaded = true;
          this.gameId = selectGameId(state);
          const games = selectPreloadedGames(state);
          const preloaded = selectGameAssets(this.gameId)(state);
          this.store.dispatch(new SetAllItemsAction({
            data: preloaded,
            key: ''
          }));
          this.store.dispatch(new ChangeSelectedItemAction({ key: formKeys.GAMES, data: games[this.gameId] }));
          this.store.dispatch(new SetItemsAction({ data: games, key: formKeys.GAMES }));
        }
      })
    ];
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  get backURL() {
    return `/games/${this.gameId}/editor`;
  }

}
