import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { selectGameInstanceId, AutoUnsubscribe } from '@app/shared';

import { FetchActiveGame } from '../../state';

@Component({
  selector: 'rg-game-loader',
  templateUrl: './game-loader.component.html',
  styleUrls: ['./game-loader.component.scss']
})
@AutoUnsubscribe()
export class GameLoaderComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  game_id$: Subscription;

  ngOnInit() {
    this.game_id$ = this.store.pipe(
      select(selectGameInstanceId),
      map(id => {
        this.store.dispatch(new FetchActiveGame(id));
      })
    ).subscribe();
  }
}
