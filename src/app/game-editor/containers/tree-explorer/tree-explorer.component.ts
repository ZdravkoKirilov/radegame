import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AppState } from '@app/core';
import {
  Module, ALL_ENTITIES, ImageAsset, Token, AllEntity, GameEntity, EntityId, Sandbox, Style, Text, Shape, Sound, Sonata,
  Animation, Widget, Expression, ModuleId, WidgetNode, NodeHandler, NodeLifecycle
} from '@app/game-mechanics';
import { AutoUnsubscribe } from '@app/shared';

import {
  getItems, DeleteModule, DeleteItemAction, SaveItemAction, selectModuleId, selectEntityId, getEntityType, getNestedEntityType, getActiveNode, getActiveHandler, getActiveLifecycle
} from '../../state';
import { map } from 'rxjs/operators';

type DeletePayload = Partial<{
  module: Module,
  entityType: AllEntity,
  entity: GameEntity,
  sandbox: Sandbox;
  nestedEntityType: 'frames' | 'texts',
  nestedEntity: { id: EntityId },
}>;
@Component({
  selector: 'rg-tree-explorer',
  templateUrl: './tree-explorer.component.html',
  styleUrls: ['./tree-explorer.component.scss']
})
@AutoUnsubscribe()
export class TreeExplorerComponent implements OnInit {

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  openedPanels = new Set<string>();

  modules$: Observable<Module[]>;
  images$: Observable<ImageAsset[]>;
  tokens$: Observable<Token[]>;
  sandboxes$: Observable<Sandbox[]>;
  styles$: Observable<Style[]>;
  shapes$: Observable<Shape[]>;
  texts$: Observable<Text[]>;
  sounds$: Observable<Sound[]>;
  sonatas$: Observable<Sonata[]>;
  animations$: Observable<Animation[]>;
  widgets$: Observable<Widget[]>;
  expressions$: Observable<Expression[]>;

  activePanel$: Subscription;

  moduleId: ModuleId;
  entityId: EntityId;
  entityType: AllEntity;
  nestedEntityType: 'texts' | 'frames';
  nestedEntityId: EntityId;

  dialogRef: MatDialogRef<any>;
  @ViewChild('confirmDelete') public confirm: TemplateRef<any>;

  ngOnInit() {
    this.modules$ = this.store.pipe(select(getItems(ALL_ENTITIES.modules)));
    this.images$ = this.store.pipe(select(getItems(ALL_ENTITIES.images)));
    this.tokens$ = this.store.pipe(select(getItems(ALL_ENTITIES.tokens)));
    this.sandboxes$ = this.store.select(getItems(ALL_ENTITIES.sandboxes));
    this.styles$ = this.store.select(getItems(ALL_ENTITIES.styles));
    this.shapes$ = this.store.select(getItems(ALL_ENTITIES.shapes));
    this.texts$ = this.store.select(getItems(ALL_ENTITIES.texts));
    this.sounds$ = this.store.select(getItems(ALL_ENTITIES.sounds));
    this.sonatas$ = this.store.select(getItems(ALL_ENTITIES.sonatas));
    this.animations$ = this.store.select(getItems(ALL_ENTITIES.animations));
    this.widgets$ = this.store.select(getItems(ALL_ENTITIES.widgets));
    this.expressions$ = this.store.select(getItems(ALL_ENTITIES.expressions));

    this.activePanel$ = combineLatest([
      this.store.pipe(select(selectModuleId)),
      this.store.pipe(select(selectEntityId)),
      this.store.pipe(select(getEntityType)),
      this.store.pipe(select(getNestedEntityType)),
      this.store.select(getActiveNode),
      this.store.select(getActiveHandler),
      this.store.select(getActiveLifecycle),
    ]).pipe(
      map<[ModuleId, EntityId, AllEntity, any, WidgetNode, NodeHandler, NodeLifecycle], any>(
        ([moduleId, entityId, entityType, nestedEntityType, node, handler, lifecycle]) => {

          if (moduleId) {
            this.openedPanels.add(`modules_${moduleId}`);
          }
          if (entityType) {
            this.openedPanels.add(`modules_${moduleId}_${entityType}`);
          }
          if (entityType && entityId) {
            this.openedPanels.add(`modules_${moduleId}_${entityType}_${entityId}`);
          }
          if (nestedEntityType) {
            this.openedPanels.add(`modules_${moduleId}_${entityType}_${entityId}_${nestedEntityType}`);
          }
          if (node) {
            this.openedPanels.add(`nodes_${node.id}`);
          }
        })
    ).subscribe();

  }

  isPanelOpen(panelId: string): boolean {
    return this.openedPanels.has(panelId);
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
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

  deleteSandbox(event: MouseEvent, sandbox: Sandbox) {
    this.stopPropagation(event);
    this.dialogRef = this.dialog.open<TemplateRef<any>, DeletePayload>(this.confirm, { data: { sandbox } });
  }

  onConfirmDelete({ module, entityType, entity, nestedEntity, nestedEntityType, sandbox }: DeletePayload) {

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
    if (sandbox) {
      this.dialogRef.close();
      return this.store.dispatch(new DeleteItemAction({ key: ALL_ENTITIES.sandboxes, data: sandbox }));
    }
  }

  onCancelDelete() {
    this.dialogRef.close();
  }

}
