import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { GameId, Version, VersionId } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId, selectVersionId } from '@app/shared';

import { SaveVersion, selectVersion, FetchVersionDetails, SetVersion, versionActionTypes, getEntityForm, getEntities } from '../../state';

@Component({
  selector: 'rg-entity-editor-container',
  templateUrl: './entity-editor-container.component.html',
  styleUrls: ['./entity-editor-container.component.scss']
})
export class EntityEditorContainerComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  entity$: Observable<Version>;
  formDefinition$: Observable<FormDefinition>;
  connectedEntities$: Observable<ConnectedEntities>;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  draft: Version;
  draftValid: boolean;

  onVersionCreated$: Subscription;

  ngOnInit(): void {

    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));

    this.entity$ = combineLatest(
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
      switchMap(() => this.store.pipe(select(selectVersion), tap(version => {
        this.draft = { ...version };
        this.loading = false;
        this.cd.detectChanges();
      })))
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

  updateDraft(form: FormGroup) {
    this.draft = form.value;
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveEntity() {
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
