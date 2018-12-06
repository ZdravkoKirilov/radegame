import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { combineLatest, Observable } from 'rxjs';
import { getActiveStage, getItems, formKeys, getEntities, SaveItemAction, selectGameId } from '../../state';
import { map, filter } from 'rxjs/operators';
import { Stage, Slot, PathEntity } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';

@Component({
  selector: 'rg-board-container',
  template: `
    <ng-container *ngIf="data$ | async as data">
      <rg-board-editor 
        [stage]="data.stage"
        [slots]="data.slots"
        [paths]="data.paths"
        [entities]="data.entities"
        [gameId]="data.gameId"
        (saveSlot)="saveSlot($event)"
      ></rg-board-editor>
    </ng-container>
  `,
  styles: []
})
export class BoardContainerComponent {

  constructor(private store: Store<AppState>) { }

  data$: Observable<{
    stage: Stage,
    slots: Slot[],
    paths: PathEntity[],
    entities: ConnectedEntities
  }> = combineLatest(
    this.store.pipe(select(getActiveStage)),
    this.store.pipe(select(getItems<Slot[]>(formKeys.SLOTS))),
    this.store.pipe(select(getItems<PathEntity[]>(formKeys.PATHS))),
    this.store.pipe(select(getEntities)),
    this.store.pipe(select(selectGameId)),
  ).pipe(
    filter(data => data.every(elem => !!elem)),
    map(([stage, slots, paths, entities, gameId]) => {
      return { stage, slots, paths, entities, gameId };
    }),
  )

  saveSlot = (slot: Slot) => {

    this.store.dispatch(new SaveItemAction({
      key: formKeys.SLOTS,
      data: slot,
    }));
  }

}
