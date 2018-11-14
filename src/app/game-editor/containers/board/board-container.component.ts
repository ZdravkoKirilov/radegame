import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { combineLatest, Observable } from 'rxjs';
import { getActiveStage, getItems, formKeys, getEntities } from 'app/game-editor/state';
import { map, filter } from 'rxjs/operators';
import { Stage, Slot, PathEntity } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';

@Component({
  selector: 'rg-board-container',
  template: `
    <ng-container *ngIf="data$ | async as data">
      <rg-board-editor 
        [stage]="data.stage"
        [locations]="data.locations"
        [paths]="data.paths"
        [entities]="data.entities"
      ></rg-board-editor>
    </ng-container>
  `,
  styles: []
})
export class BoardContainerComponent {

  constructor(private store: Store<AppState>) { }

  data$: Observable<{
    stage: Stage,
    locations: Slot[],
    paths: PathEntity[],
    entities: ConnectedEntities
  }> = combineLatest(
    this.store.pipe(select(getActiveStage)),
    this.store.pipe(select(getItems<Slot[]>(formKeys.LOCATIONS))),
    this.store.pipe(select(getItems<PathEntity[]>(formKeys.PATHS))),
    this.store.pipe(select(getEntities)),
  ).pipe(
    filter(data => data.every(elem => !!elem)),
    map(([stage, locations, paths, entities]) => {
      return { stage, locations, paths, entities };
    }),
  )


}
