import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState, selectGameId } from '../../../core';

@Component({
  selector: 'rg-editor-wrapper',
  templateUrl: './editor-wrapper.component.html',
  styleUrls: ['./editor-wrapper.component.scss']
})
export class EditorWrapperComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public gameId: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.sub = this.store.subscribe(state => {
      this.gameId = selectGameId(state);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get backURL() {
    return `/games/${this.gameId}/editor`;
  }

}
