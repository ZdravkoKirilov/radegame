import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppState } from '@app/core';
import { ALL_ENTITIES } from '@app/game-mechanics';
import { selectGameId } from '@app/shared';

import { SmartBase } from '../../mixins';
import { composeSandboxForm } from '../../forms';
import { FetchItemsAction, getItems, getSelectedEntity, getEntities, getEditorState } from '../../state';

@Component({
  selector: 'rg-sandboxes-container',
  template: `
    <rg-entity-view
          [formDefinition]="formDefinition"
          [items]="items$ | async"
          [showEditor]="showEditor$ | async"
          [selectedItem]="selectedItem$ | async"
          [connectedEntities]="connectedEntities$ | async"
          [template]="template"
          (toggleEditor)="toggleEditor($event)"
          (saveItem)="saveItem($event)"
          (editItem)="editItem($event)"
          (removeItem)="removeItem($event)">
    </rg-entity-view>

  <ng-template #template let-item>
    <mat-card>
        <mat-card-header>
            <mat-card-title>{{item.name}}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
            <p>{{item.description}}</p>
            <a mat-button [routerLink]="[item.id, 'live-test']">Live test</a>
        </mat-card-content>

        <mat-card-actions>
            <button mat-button (click)="removeItem(item)">Remove</button>
            <button mat-button (click)="editItem(item)">Edit</button>
        </mat-card-actions>

    </mat-card>
  </ng-template>
  `,
  styles: []
})
export class SandboxesContainerComponent extends SmartBase implements OnInit {

  formDefinition = composeSandboxForm;
  readonly key = ALL_ENTITIES.sandboxes;

  constructor(public store: Store<AppState>) {
    super(store);
  }

  ngOnInit() {

    this.gameId$ = this.store.pipe(
      select(selectGameId),
      map(gameId => {
        this.gameId = gameId;
        this.store.dispatch(
          new FetchItemsAction({ key: ALL_ENTITIES.sandboxes, data: { gameId } })
        );
      }),
    ).subscribe();

    this.items$ = this.store.pipe(select(getItems(this.key)));
    this.connectedEntities$ = this.store.pipe(select(getEntities));
    this.showEditor$ = this.store.pipe(select(getEditorState(this.key)));
    this.selectedItem$ = this.store.pipe(
      select(getSelectedEntity(this.key)),
      map(item => {
        this.selectedItem = item;
        return item;
      }),
    );
  }

}
