import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AppState } from '@app/core';
import { selectGameId, selectVersionId } from '@app/shared';
import { GameId, Setup } from '@app/game-mechanics';

import { FetchVersionedItems, getItems, DeleteItem } from '../../state';
import { STORE_KEYS } from 'app/game-editor/utils';

@Component({
  selector: 'rg-setups-list',
  templateUrl: './setups-list.component.html',
  styleUrls: ['./setups-list.component.scss']
})
export class SetupsListComponent implements OnInit {

  dialogRef: MatDialogRef<any>;

  @ViewChild('confirmDelete') public confirm: TemplateRef<any>;

  setups$: Observable<Setup[]>;
  gameId: GameId;
  loading: boolean;

  constructor(public store: Store<AppState>, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.setups$ = combineLatest([
      this.store.select(selectVersionId),
      this.store.select(selectGameId),
    ]).pipe(
      tap(([versionId, gameId]) => {
        if (versionId) {
          this.loading = true;
          this.gameId = gameId;
          this.store.dispatch(new FetchVersionedItems({ versionId, entityType: 'Setup' }));
          this.cd.detectChanges();
        }
      }),
      switchMap(() => this.store.pipe(select(getItems<Setup>(STORE_KEYS.setups)), tap(() => {
        this.loading = false;
        this.cd.detectChanges();
      })))
    )
  }

  addSetup() {
    this.router.navigate(['../', 'add'], { relativeTo: this.route });
  }

  deleteSetup(setup: Setup) {
    this.dialogRef = this.dialog.open(this.confirm, { data: { setup } });
  }

  onConfirmDelete(setup: Setup ) {
    this.store.dispatch(new DeleteItem({ item: setup }));
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

}
