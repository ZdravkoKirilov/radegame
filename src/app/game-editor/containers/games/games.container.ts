import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AppState, selectUserId } from '@app/core';
import { AutoUnsubscribe } from '@app/shared';
import { Game } from '@app/game-mechanics';

import { FetchGamesAction, selectAllGames, DeleteGameAction } from '../../state';

@Component({
  selector: 'rg-games-container',
  templateUrl: './games.container.html',
  styleUrls: ['./games.container.scss']
})
@AutoUnsubscribe()
export class GamesContainerComponent implements OnInit {
  private userId$: Subscription;
  dialogRef: MatDialogRef<any>;

  @ViewChild('confirmDelete') public confirm: TemplateRef<any>;

  games$: Observable<Game[]>;

  constructor(public store: Store<AppState>, private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.userId$ = this.store.pipe(
      select(selectUserId),
      map(userId => this.store.dispatch(new FetchGamesAction({ userId }))),
    ).subscribe();

    this.games$ = this.store.pipe(select(selectAllGames));
  }

  addGame() {
    this.router.navigate(['../', 'add'], { relativeTo: this.route });
  }

  deleteGame(game: Game) {
    this.dialogRef = this.dialog.open(this.confirm, { data: { game } });
  }

  onConfirmDelete(game: Game) {
    this.store.dispatch(new DeleteGameAction({ game }));
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }
}
