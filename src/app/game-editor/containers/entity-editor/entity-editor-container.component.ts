import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { GameId, VersionId, GameEntity, ModuleId, EntityId, StoreKey } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { AutoUnsubscribe, selectGameId, selectVersionId } from '@app/shared';

import { getEntityForm, getEntities, SetItemAction, genericActionTypes, selectModuleId, getEntityByIdAndType, selectEntityId, getEntityType, SaveItemAction, RemoveItemAction } from '../../state';

@Component({
  selector: 'rg-entity-editor-container',
  templateUrl: './entity-editor-container.component.html',
  styleUrls: ['./entity-editor-container.component.scss']
})
@AutoUnsubscribe()
export class EntityEditorContainerComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  entity$: Observable<GameEntity>;
  formDefinition$: Observable<FormDefinition>;
  connectedEntities$: Observable<ConnectedEntities>;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  moduleId: ModuleId;
  entityId: EntityId;
  entityType: StoreKey;

  draft: GameEntity;
  draftValid: boolean;

  onEntityCreated$: Subscription;
  onEntityDeleted$: Subscription;

  ngOnInit(): void {

    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));

    this.entity$ = combineLatest(
      this.store.pipe(select(selectGameId)), this.store.pipe(select(selectVersionId)),
      this.store.pipe(select(selectModuleId)), this.store.pipe(select(selectEntityId)),
      this.store.pipe(select(getEntityType))
    ).pipe(
      tap(([gameId, versionId, moduleId, entityId, entityType]) => {
        this.gameId = gameId;
        this.moduleId = moduleId;
        this.versionId = versionId;
        this.entityId = entityId;
        this.entityType = entityType;

        this.cd.detectChanges();
      }),
      switchMap(() => this.store.pipe(select(getEntityByIdAndType(this.entityId, this.entityType)), tap(entity => {
        this.draft = { ...entity };
        this.loading = false;
        this.cd.detectChanges();
      })))
    )

    this.onEntityCreated$ = this.actions$.pipe(
      ofType<SetItemAction<GameEntity>>(genericActionTypes.SET_ITEM),
      map(action => {
        this.router.navigate(['../', action.payload.data.id], { relativeTo: this.route });
      })
    ).subscribe();

    this.onEntityDeleted$ = this.actions$.pipe(
      ofType<RemoveItemAction<GameEntity>>(genericActionTypes.REMOVE_ITEM),
      map(() => this.closeEditor())
    ).subscribe();
  }

  updateDraft(form: FormGroup) {
    this.draft = form.value;
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveEntity() {
    const entity = {
      ...this.draft,
      id: this.entityId,
      game: this.gameId,
      version: this.versionId,
      module: this.moduleId,
    };

    this.store.dispatch(new SaveItemAction({
      key: this.entityType,
      data: entity
    }));
  }

  closeEditor() {
    this.router.navigate(['../', '../', '../', '../', 'dashboard'], { relativeTo: this.route });
  }

}
