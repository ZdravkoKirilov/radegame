import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { GameId, VersionId, ModuleId, NestedEntity, GameEntityParser, EntityWithChildren } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId, selectVersionId, AutoUnsubscribe } from '@app/shared';

import { getEntityForm, getEntities, genericActionTypes, selectModuleId, getNestedEntityParser, FetchGameData, selectNestedEntity, SetItem, RemoveItem, SaveItem, selectParentEntityId } from '../../state';

@Component({
  selector: 'rg-nested-entity-editor',
  templateUrl: './nested-entity-editor.component.html',
  styleUrls: ['./nested-entity-editor.component.scss']
})
@AutoUnsubscribe()
export class NestedEntityEditorComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  entity$: Observable<NestedEntity>;
  entityParser: Pick<GameEntityParser<NestedEntity, unknown, unknown>, 'fromUnknown'>;

  formDefinition$: Observable<FormDefinition<NestedEntity>>;
  connectedEntities$: Observable<ConnectedEntities>;

  onEntityCreated$: Subscription;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  moduleId: ModuleId;
  parentId: EntityWithChildren['id'];
  draft: {};
  draftValid: boolean;

  ngOnInit(): void {

    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));

    this.entity$ = combineLatest(
      this.store.select(selectGameId),
      this.store.select(selectVersionId),
      this.store.select(getNestedEntityParser),
      this.store.select(selectModuleId),
      this.store.select(selectParentEntityId)
    ).pipe(
      tap(([gameId, versionId, entityParser, moduleId, parentId]) => {
        this.gameId = gameId;
        this.versionId = versionId;
        this.entityParser = entityParser;
        this.moduleId = moduleId;
        this.parentId = parentId;

        this.store.dispatch(new FetchGameData({ gameId, moduleId, versionId }));

        this.cd.detectChanges();
      }),
      switchMap(() => this.store.pipe(
        select(selectNestedEntity),
        filter<NestedEntity>(Boolean),
        tap(entity => {
          this.draft = { ...entity };
          this.loading = false;
          this.cd.detectChanges();
        })))
    );

    this.onEntityCreated$ = this.actions$.pipe(
      ofType<SetItem>(genericActionTypes.SET_ITEM),
      map(action => {
        this.router.navigate(['../', action.payload.item.id], { relativeTo: this.route });
      })
    ).subscribe();

  }

  updateDraft(form: FormGroup) {
    this.draft = { ...this.draft, ...form.value, owner: this.parentId };
    this.draftValid = form.valid;
    this.cd.detectChanges();
  }

  saveEntity() {
    const entity = this.entityParser.fromUnknown.toEntity(this.draft);
    this.store.dispatch(new SaveItem({ item: entity }));
  }

  closeEditor() {
    this.router.navigate(['../', '../', '../', '../', 'dashboard'], { relativeTo: this.route });
  }

}
