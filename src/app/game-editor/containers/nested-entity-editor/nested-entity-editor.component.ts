import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { get, last } from 'lodash';

import { AppState } from '@app/core';
import { GameId, VersionId, GameEntity, ModuleId, EntityId, StoreKey } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId, selectVersionId, AutoUnsubscribe } from '@app/shared';

import { getEntityForm, getEntities, SetItemAction, genericActionTypes, selectModuleId, getEntityByIdAndType, selectEntityId, getEntityType, SaveItemAction, getNestedEntityType, selectNestedEntityId } from '../../state';

@Component({
  selector: 'rg-nested-entity-editor',
  templateUrl: './nested-entity-editor.component.html',
  styleUrls: ['./nested-entity-editor.component.scss']
})
@AutoUnsubscribe()
export class NestedEntityEditorComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  parentEntity$: Subscription;
  formDefinition$: Observable<FormDefinition>;
  connectedEntities$: Observable<ConnectedEntities>;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  moduleId: ModuleId;
  entityId: EntityId;
  entityType: StoreKey;
  nestedEntityType: 'texts' | 'frames';
  nestedEntityId: EntityId;
  nestedEntity: GameEntity;
  parentEntity: GameEntity;

  draft: GameEntity;
  draftValid: boolean;

  onEntityCreated$: Subscription;

  ngOnInit(): void {

    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));

    this.parentEntity$ = combineLatest(
      [this.store.pipe(select(selectGameId)), this.store.pipe(select(selectVersionId)),
      this.store.pipe(select(selectModuleId)), this.store.pipe(select(selectEntityId)),
      this.store.pipe(select(getEntityType)), this.store.pipe(select(getNestedEntityType)),
      this.store.pipe(select(selectNestedEntityId))]
    ).pipe(
      tap(([gameId, versionId, moduleId, entityId, entityType, nestedEntityType, nestedEntityId]) => {
        this.gameId = gameId;
        this.moduleId = moduleId;
        this.versionId = versionId;
        this.entityId = entityId;
        this.entityType = entityType;
        this.nestedEntityType = nestedEntityType;
        this.nestedEntityId = nestedEntityId;
        this.cd.detectChanges();
      }),
      switchMap(() => this.store.pipe(select(getEntityByIdAndType(this.entityId, this.entityType)), tap(entity => {
        const nestedEntities: GameEntity[] = get(entity, this.nestedEntityType) || [];
        const nestedEntity = nestedEntities.find(elem => String(elem.id) === this.nestedEntityId) || {};
        this.parentEntity = entity;
        this.nestedEntity = nestedEntity;
        this.draft = { ...nestedEntity };
        this.loading = false;
        this.cd.detectChanges();
      })))
    ).subscribe();

    this.onEntityCreated$ = this.actions$.pipe(
      ofType<SetItemAction<GameEntity>>(genericActionTypes.SET_ITEM),
      map(action => {
        const nestedEntityId = get(last(action.payload.data[this.nestedEntityType]), 'id');
        this.router.navigate(['../', nestedEntityId], { relativeTo: this.route });
      })
    ).subscribe();
  }

  updateDraft(form: FormGroup) {
    this.draft = form.value;
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveEntity() {
    const childEntity = {
      ...this.draft,
      owner: this.parentEntity.id
    };

    const entity = {
      ...this.parentEntity,
      game: this.gameId,
      version: this.versionId,
      module: this.moduleId,
      [this.nestedEntityType]: [...get(this.parentEntity, this.nestedEntityType, []).filter(elem => elem.id !== childEntity.id), childEntity]
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
