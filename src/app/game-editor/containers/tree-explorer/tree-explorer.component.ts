import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AppState } from '@app/core';
import { Module, ALL_ENTITIES, Setup, ImageAsset, Token, AllEntity, GameEntity, EntityId } from '@app/game-mechanics';
import { getItems, DeleteSetup, DeleteModule, DeleteItemAction, SaveItemAction } from '../../state';

type DeletePayload = Partial<{
  setup: Setup,
  module: Module,
  entityType: AllEntity,
  entity: GameEntity,
  nestedEntityType: 'frames' | 'texts',
  nestedEntity: { id: EntityId },
}>;
@Component({
  selector: 'rg-tree-explorer',
  templateUrl: './tree-explorer.component.html',
  styleUrls: ['./tree-explorer.component.scss']
})
export class TreeExplorerComponent implements OnInit {

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  modules$: Observable<Module[]>;
  setups$: Observable<Setup[]>;
  images$: Observable<ImageAsset[]>;
  tokens$: Observable<Token[]>;

  dialogRef: MatDialogRef<any>;
  @ViewChild('confirmDelete') public confirm: TemplateRef<any>;

  ngOnInit() {
    this.modules$ = this.store.pipe(select(getItems<Module>(ALL_ENTITIES.modules)));
    this.setups$ = this.store.pipe(select(getItems<Setup>(ALL_ENTITIES.setups)));
    this.images$ = this.store.pipe(select(getItems<ImageAsset>(ALL_ENTITIES.images)));
    this.tokens$ = this.store.pipe(select(getItems<Token>(ALL_ENTITIES.tokens)));
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  deleteSetup(event: MouseEvent, setup: Setup) {
    this.stopPropagation(event);
    this.dialogRef = this.dialog.open<TemplateRef<any>, DeletePayload>(this.confirm, { data: { setup } });
  }

  deleteModule(event: MouseEvent, module: Module) {
    this.stopPropagation(event);
    this.dialogRef = this.dialog.open<TemplateRef<any>, DeletePayload>(this.confirm, { data: { module } });
  }

  deleteEntity(event: MouseEvent, entityType: AllEntity, entity: GameEntity) {
    this.stopPropagation(event);
    this.dialogRef = this.dialog.open<TemplateRef<any>, DeletePayload>(this.confirm, { data: { entityType, entity } });
  }

  deleteNestedEntity(event: MouseEvent, entityType: AllEntity, entity: GameEntity, nestedEntityType: DeletePayload['nestedEntityType'], nestedEntity: DeletePayload['nestedEntity']) {
    this.stopPropagation(event);
    this.dialogRef = this.dialog.open<TemplateRef<any>, DeletePayload>(this.confirm, { data: { entityType, entity, nestedEntity, nestedEntityType } });
  }

  onConfirmDelete({ setup, module, entityType, entity, nestedEntity, nestedEntityType }: DeletePayload) {

    if (setup) {
      this.dialogRef.close();
      return this.store.dispatch(new DeleteSetup({ setup }));
    }
    if (module) {
      this.dialogRef.close();
      return this.store.dispatch(new DeleteModule({ module }));
    }
    if (entityType && entity && nestedEntity && nestedEntityType) {
      const withoutNestedEntity = {
        ...entity,
        [nestedEntityType]: entity[nestedEntityType].filter(elem => elem.id !== nestedEntity.id)
      };
      this.dialogRef.close();
      return this.store.dispatch(new SaveItemAction({ key: entityType, data: withoutNestedEntity }));
    }
    if (entityType && entity) {
      this.dialogRef.close();
      return this.store.dispatch(new DeleteItemAction({ key: entityType, data: entity }));
    }
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

}
