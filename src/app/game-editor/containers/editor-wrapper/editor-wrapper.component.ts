import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { AppState, selectGameId, selectGameAssets, selectPreloadedGames } from '../../../core';
import { GameTemplate } from '../../../game-mechanics';
import * as actions from '../../state/actions';
import { SetAllItemsAction, SetItemAction, SetItemsAction } from '../../state/actions/generics';
import { selectGamesList } from '../../state';

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
          this.store.dispatch(new actions.UpdateEditorAssetsAction({ game: games[this.gameId] }));
          this.store.dispatch(new SetItemsAction({
            data: games,
            key: 'games'
          }));
          // this.store.dispatch(new actions.SetResourcesAction(preloaded.resources));
          // this.store.dispatch(new actions.SetFactionsAction(preloaded.factions));
          // this.store.dispatch(new actions.SetActivitiesAction(preloaded.activities));
          // this.store.dispatch(new actions.SetRoundsAction(preloaded.rounds));
          // this.store.dispatch(new actions.SetStagesAction(preloaded.rounds));
          // this.store.dispatch(new actions.SetQuestsAction(preloaded.quests));
          // this.store.dispatch(new actions.SetFieldsAction(preloaded.fields));
          // this.store.dispatch(new actions.SetMapLocationsAction(preloaded.locations));
          // this.store.dispatch(new actions.SetMapPathsAction(preloaded.paths));
          // this.store.dispatch(new actions.SetTriviasAction(preloaded.trivia));
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
