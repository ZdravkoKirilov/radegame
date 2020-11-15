import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { AppState } from '@app/core';
import { GameId, VersionId, ModularEntity, GameEntityParser, ModuleId } from '@app/game-mechanics';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId, selectVersionId, AutoUnsubscribe } from '@app/shared';
import {
  FetchGameData,
  genericActionTypes, getEntities, getEntityForm, getModularEntityParser, RemoveItem, SaveItem,
  selectModularEntity, selectModuleId, SetItem
} from '../../state';

@Component({
  selector: 'rg-modular-entity-editor',
  templateUrl: './modular-entity-editor.component.html',
  styleUrls: ['./modular-entity-editor.component.scss']
})
@AutoUnsubscribe()
export class ModularEntityEditorComponent implements OnInit {

  constructor(public store: Store<AppState>, private cd: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  entity$: Observable<ModularEntity>;
  entityParser: Pick<GameEntityParser<ModularEntity, unknown, unknown>, 'fromUnknown'>;

  formDefinition$: Observable<FormDefinition<ModularEntity>>;
  connectedEntities$: Observable<ConnectedEntities>;

  onEntityCreated$: Subscription;
  onEntityDeleted$: Subscription;

  loading: boolean;
  gameId: GameId;
  versionId: VersionId;
  moduleId: ModuleId;
  draft: {};
  draftValid: boolean;

  ngOnInit(): void {

    this.formDefinition$ = this.store.pipe(select(getEntityForm));
    this.connectedEntities$ = this.store.pipe(select(getEntities));

    this.entity$ = combineLatest(
      this.store.select(selectGameId),
      this.store.select(selectVersionId),
      this.store.select(getModularEntityParser),
      this.store.select(selectModuleId),
    ).pipe(
      tap(([gameId, versionId, entityParser, moduleId]) => {
        this.gameId = gameId;
        this.versionId = versionId;
        this.entityParser = entityParser;
        this.moduleId = moduleId;

        this.store.dispatch(new FetchGameData({ gameId, moduleId, versionId }));

        this.cd.detectChanges();
      }),
      switchMap(() => this.store.pipe(
        select(selectModularEntity),
        filter<ModularEntity>(Boolean),
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

    this.onEntityDeleted$ = this.actions$.pipe(
      ofType<RemoveItem>(genericActionTypes.REMOVE_ITEM),
      map(action => {
        if (Number(action.payload.item.id) == this.draft['id']) {
          this.router.navigate(['../', '../', 'dashboard'], { relativeTo: this.route })
        }
      })
    ).subscribe();

  }

  updateDraft(form: FormGroup) {
    this.draft = { ...this.draft, ...form.value, module: this.moduleId };
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
