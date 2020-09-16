import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { GameId, VersionId, Module, Setup, ALL_ENTITIES } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId, selectVersionId, AutoUnsubscribe } from '@app/shared';

import {
  getEntityForm, getEntities, getEntityType, getActiveModule, getSetup, SaveModule,
  SaveSetup, genericActionTypes, SetItemAction, FetchItemsAction, RemoveItemAction
} from '../../state';

type RootEntityType = typeof ALL_ENTITIES.setups | typeof ALL_ENTITIES.modules;

@Component({
  selector: 'rg-root-entity-editor',
  templateUrl: './root-entity-editor.component.html',
  styleUrls: ['./root-entity-editor.component.scss']
})
@AutoUnsubscribe()
export class RootEntityEditorComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  entity$: Observable<Setup | Module>;
  formDefinition$: Observable<FormDefinition>;
  connectedEntities$: Observable<ConnectedEntities>;
  entityType: RootEntityType;
  onEntityCreated$: Subscription;
  onEntityDeleted$: Subscription;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  draft: Setup | Module;
  draftValid: boolean;

  ngOnInit(): void {

    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));

    this.entity$ = combineLatest(
      this.store.pipe(select(selectGameId)), this.store.pipe(select(selectVersionId)), this.store.pipe(select(getEntityType))
    ).pipe(
      tap(([gameId, versionId, entityType]) => {
        this.gameId = gameId;
        this.versionId = versionId;
        this.entityType = entityType as RootEntityType;

        this.store.dispatch(new FetchItemsAction({ key: ALL_ENTITIES.modules, data: { gameId } }));
        this.store.dispatch(new FetchItemsAction({ key: ALL_ENTITIES.setups, data: { gameId } }));

        this.cd.detectChanges();
      }),
      switchMap(() => this.store.pipe(
        select<object, unknown, Module | Setup>(this.entityType === 'modules' ? getActiveModule : getSetup),
        filter<Module | Setup>(Boolean),
        tap(entity => {
          this.draft = { ...entity };
          this.loading = false;
          this.cd.detectChanges();
        })))
    );

    this.onEntityCreated$ = this.actions$.pipe(
      ofType<SetItemAction<Module | Setup>>(genericActionTypes.SET_ITEM),
      map(action => {
        this.router.navigate(['../', action.payload.data.id], { relativeTo: this.route });
      })
    ).subscribe();

    this.onEntityDeleted$ = this.actions$.pipe(
      ofType<RemoveItemAction<Setup | Module>>(genericActionTypes.REMOVE_ITEM),
      map(action => {
        if (action.payload.data.id == this.draft.id) {
          this.router.navigate(['../', '../', 'dashboard'], { relativeTo: this.route })
        }
      })
    ).subscribe();

  }

  updateDraft(form: FormGroup) {
    this.draft = { ...this.draft, ...form.value };
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveEntity() {
    if (this.entityType === ALL_ENTITIES.modules) {
      this.draft.game = this.gameId;
      this.draft.version = this.versionId;
      this.store.dispatch(new SaveModule({ module: Module.toDTO(this.draft) }));
    }
    if (this.entityType === ALL_ENTITIES.setups) {
      this.draft.game = this.gameId;
      this.draft.version = this.versionId;
      this.store.dispatch(new SaveSetup({ setup: Setup.toDTO(this.draft) }));
    }
  }

  closeEditor() {
    this.router.navigate(['../', 'dashboard'], { relativeTo: this.route });
  }

}
