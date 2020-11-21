import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { Game, GameId } from '@app/game-mechanics';
import { selectGameId, AutoUnsubscribe } from '@app/shared';

import { FetchGameDetails, selectGame, SaveGameAction, SetGameAction, gameActionTypes } from '../../state';
import { composeGameForm } from '../../forms';

@Component({
  selector: 'rg-games-editor-container',
  templateUrl: './games-editor-container.component.html',
  styleUrls: ['./games-editor-container.component.scss'],
})
@AutoUnsubscribe()
export class GamesEditorContainerComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  formDefinition = composeGameForm;

  game$: Observable<Game | undefined>;

  loading: boolean;
  gameId: GameId;
  draft: {};
  draftValid: boolean;

  onGameCreated$: Subscription;
  data$: Subscription;

  ngOnInit(): void {
    this.data$ = this.store.pipe(
      select(selectGameId), tap(gameId => {
        if (gameId) {
          this.loading = true;
          this.gameId = gameId;
          this.cd.detectChanges();
          this.store.dispatch(new FetchGameDetails({ gameId }));
        }
      })
    ).subscribe();

    this.game$ = this.store.pipe(select(selectGame), tap(game => {
      this.draft = { ...game };
      this.loading = false;
      this.cd.detectChanges();
    }))

    this.onGameCreated$ = this.actions$.pipe(
      ofType<SetGameAction>(gameActionTypes.SET_GAME),
      map(() => {
        if (!this.gameId) {
          this.router.navigate(['../', 'list'], { relativeTo: this.route });
        }
      })
    ).subscribe();
  }

  updateGameDraft(form: FormGroup) {
    this.draft = form.value;
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveGame() {
    const game = Game.fromUnknown.toEntity(this.draft);
    this.store.dispatch(new SaveGameAction({ game }));
  }

  closeEditor() {
    if (this.gameId) {
      this.router.navigate(['../../', 'list'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../', 'list'], { relativeTo: this.route });
    }
  }

}
