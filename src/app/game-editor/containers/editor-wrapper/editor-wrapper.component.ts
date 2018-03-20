import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { ActivatedRoute } from '@angular/router';

import { AppState, selectGameId, selectPreloadedData } from '../../../core';
import { GameTemplate } from '../../../game-mechanics';
import * as actions from '../../state/actions';

@Component({
  selector: 'rg-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit, OnDestroy {
  private subs: Subscription[];
  public gameId: number;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs = [
      selectPreloadedData(this.route).subscribe((preloaded: GameTemplate) => {
        //this.store.dispatch(new actions.SetResourcesAction(preloaded.resources));
      }),
      this.store.select(selectGameId).subscribe(gameId => {
        this.gameId = gameId;
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
