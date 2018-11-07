import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { combineLatest, Observable } from 'rxjs';
import { getActiveStage, getItems, formKeys, getEntities } from 'app/game-editor/state';
import { map, filter } from 'rxjs/operators';
import { Stage, LocationEntity, PathEntity } from '@app/game-mechanics';

@Component({
  selector: 'rg-board-container',
  template: `
    <ng-container *ngIf="data$ | async as data">
      <rg-board-editor [stage]="data.stage"></rg-board-editor>
    </ng-container>
  `,
  styles: []
})
export class BoardContainerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  data$: Observable<{ stage: Stage }> = combineLatest(
    this.store.pipe(select(getActiveStage)),
    this.store.pipe(select(getItems<LocationEntity[]>(formKeys.LOCATIONS))),
    this.store.pipe(select(getItems<PathEntity>(formKeys.PATHS))),
    this.store.pipe(select(getEntities)),
  ).pipe(
    filter(([stage, locations, paths, entities ]) => {
      return !!stage && !!locations && !!paths && !!entities;
    }),
    map(([stage, locations, paths, entities]) => {
      return { stage, locations, paths, entities };
    }),
  )

  ngOnInit() {
  }

}
