import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AppState } from '@app/core';
import { selectGameId } from '@app/shared';
import { Version } from '@app/game-mechanics';

import { FetchVersions, selectAllVersions, DeleteVersion } from '../../state';

@Component({
  selector: 'rg-versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.scss']
})
export class VersionsListComponent implements OnInit {
  dialogRef: MatDialogRef<any>;

  @ViewChild('confirmDelete') public confirm: TemplateRef<any>;

  versions$: Observable<Version[]>;
  loading: boolean;

  constructor(public store: Store<AppState>, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.versions$ = this.store.pipe(
      select(selectGameId), tap(gameId => {
        if (gameId) {
          this.loading = true;
          this.store.dispatch(new FetchVersions({ gameId }));
          this.cd.detectChanges();
        }
      }),
      switchMap(() => this.store.pipe(select(selectAllVersions), tap(() => {
        this.loading = false;
        this.cd.detectChanges();
      })))
    )
  }

  addVersion() {
    this.router.navigate(['../', 'add'], { relativeTo: this.route });
  }

  deleteVersion(version: Version) {
    this.dialogRef = this.dialog.open(this.confirm, { data: { version } });
  }

  onConfirmDelete(version: Version) {
    this.store.dispatch(new DeleteVersion({ version }));
    this.dialogRef.close();
  }

  onCancelDelete() {
    this.dialogRef.close();
  }
}
