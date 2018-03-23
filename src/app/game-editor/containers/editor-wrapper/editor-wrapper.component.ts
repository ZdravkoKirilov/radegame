import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { AppState, selectGameId, selectGameAssets } from '../../../core';
import { GameTemplate } from '../../../game-mechanics';
import * as actions from '../../state/actions';
import { selectGamesList } from '../../state';

@Component({
  selector: 'rg-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public gameId: number;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {

    this.subs.push(this.store.select(selectGameId).subscribe(gameId => {
      this.gameId = gameId;

      this.subs.push(this.store.select(selectGamesList).subscribe(games => {
        this.store.dispatch(new actions.UpdateEditorAssetsAction({ game: games[gameId] }));
      }));

      this.subs.push(this.store.select(selectGameAssets(gameId)).subscribe(preloaded => {
        this.store.dispatch(new actions.SetResourcesAction(preloaded.resources));
        this.store.dispatch(new actions.SetFactionsAction(preloaded.factions));
        this.store.dispatch(new actions.SetActivitiesAction(preloaded.activities));
        this.store.dispatch(new actions.SetRoundsAction(preloaded.rounds));
        this.store.dispatch(new actions.SetStagesAction(preloaded.rounds));
        this.store.dispatch(new actions.SetQuestsAction(preloaded.quests));
        this.store.dispatch(new actions.SetFieldsAction(preloaded.fields));
        this.store.dispatch(new actions.SetMapLocationsAction(preloaded.locations));
        this.store.dispatch(new actions.SetMapPathsAction(preloaded.paths));
        this.store.dispatch(new actions.SetTriviasAction(preloaded.trivia));
      }));

    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  get backURL() {
    return `/games/${this.gameId}/editor`;
  }

}
