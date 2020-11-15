import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AppState } from '@app/core';
import {
  Module, ImageAsset, Token, Sandbox, Style, Text, Shape, Sound, Sonata,
  Animation, Widget, Expression, GameId, VersionId
} from '@app/game-mechanics';
import { AutoUnsubscribe, selectGameId, selectVersionId } from '@app/shared';

import { STORE_KEYS } from '../../utils';
import { FetchGameData, getItems } from '../../state';
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

  data$: Subscription;

  gameId: GameId;
  versionId: VersionId;

  dialogRef: MatDialogRef<any>;
  @ViewChild('confirmDelete') public confirm: TemplateRef<any>;

  ngOnInit() {
    this.modules$ = this.store.pipe(select(getItems(STORE_KEYS.modules)));
    this.images$ = this.store.pipe(select(getItems(STORE_KEYS.images)));
    this.tokens$ = this.store.pipe(select(getItems(STORE_KEYS.tokens)));
    this.sandboxes$ = this.store.select(getItems(STORE_KEYS.sandboxes));
    this.styles$ = this.store.select(getItems(STORE_KEYS.styles));
    this.shapes$ = this.store.select(getItems(STORE_KEYS.shapes));
    this.texts$ = this.store.select(getItems(STORE_KEYS.texts));
    this.sounds$ = this.store.select(getItems(STORE_KEYS.sounds));
    this.sonatas$ = this.store.select(getItems(STORE_KEYS.sonatas));
    this.animations$ = this.store.select(getItems(STORE_KEYS.animations));
    this.widgets$ = this.store.select(getItems(STORE_KEYS.widgets));
    this.expressions$ = this.store.select(getItems(STORE_KEYS.expressions));

    this.data$ = combineLatest([
      this.store.select(selectGameId),
      this.store.select(selectVersionId),
    ]).pipe(
      map(([gameId, versionId]) => {
        this.gameId = gameId;
        this.versionId = versionId;
      })
    ).subscribe();

  }

  loadModuleData(module: Module) {
    this.store.dispatch(new FetchGameData({ gameId: this.gameId, versionId: this.versionId, module }));
  }

  isPanelOpen(panelId: string): boolean {
    return this.openedPanels.has(panelId);
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  onConfirmDelete() {

  }

  onCancelDelete() {
    this.dialogRef.close();
  }

}
