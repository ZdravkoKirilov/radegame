import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import {  tap, map, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { GameId, Version, VersionId } from '@app/game-mechanics';
import { selectGameId, AutoUnsubscribe, selectVersionId } from '@app/shared';

import { SaveVersion, selectVersion, FetchVersionDetails, SetVersion, versionActionTypes } from '../../state';
import { composeVersionForm } from '../../forms';

@Component({
  selector: 'rg-versions-editor',
  templateUrl: './versions-editor.component.html',
  styleUrls: ['./versions-editor.component.scss']
})
@AutoUnsubscribe()
export class VersionsEditorComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  formDefinition = composeVersionForm;

  version$: Observable<Version | undefined>;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  draft: Version;
  draftValid: boolean;
  data$: Subscription;

  onVersionCreated$: Subscription;

  ngOnInit(): void {

    this.data$ = combineLatest(
      this.store.pipe(select(selectGameId)), this.store.pipe(select(selectVersionId))
    ).pipe(
      tap(([gameId, versionId]) => {
        if (gameId) {
          this.gameId = gameId;
        }
        if (versionId && gameId) {
          this.loading = true;
          this.versionId = versionId;
          this.store.dispatch(new FetchVersionDetails({ versionId, gameId }));
        }
        this.cd.detectChanges();
      }),
    ).subscribe();

    this.version$ = this.store.pipe(
      select(selectVersion),
      filter<Version | undefined>(Boolean),
      tap(entity => {
        this.draft = { ...entity! };
        this.loading = false;
        this.cd.detectChanges();
      })
    )

    this.onVersionCreated$ = this.actions$.pipe(
      ofType<SetVersion>(versionActionTypes.SET_VERSION),
      map(() => {
        if (!this.versionId) {
          this.closeEditor();
        }
      })
    ).subscribe();
  }

  updateVersionDraft(form: FormGroup) {
    this.draft = form.value;
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveVersion() {
    this.store.dispatch(new SaveVersion({ version: { ...this.draft, game: this.gameId } }));
  }

  closeEditor() {
    if (this.versionId) {
      this.router.navigate(['../../', 'list'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../', 'list'], { relativeTo: this.route });
    }
  }

}
