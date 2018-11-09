import {
  Component, OnInit, OnChanges, Input, ViewChild, ElementRef,
  ChangeDetectionStrategy, Output, EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';

import { BoardEditService } from '../../../services';
import { LocationEntity, PathEntity, Stage } from '@app/game-mechanics';
import { AppState } from '@app/core';

@Component({
  selector: 'rg-board-main',
  template: `
    <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMainComponent implements OnInit, OnChanges {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef<HTMLDivElement>;

  @Output() selectLocation = new EventEmitter<LocationEntity>();
  @Output() selectPath = new EventEmitter<PathEntity>();
  @Output() dragEnd = new EventEmitter<LocationEntity>();

  @Input() locations: LocationEntity[];
  @Input() selectedLocation: LocationEntity;

  @Input() paths: PathEntity[];
  @Input() selectedPath: PathEntity;

  @Input() stage: Stage;

  constructor(private boardEditService: BoardEditService, private store: Store<AppState>) { }

  ngOnInit() {
    const { locations, selectedLocation, paths, selectedPath, stage } = this;
    this.boardEditService.initialize(this.canvasWrapper.nativeElement, {
      locations, selectedLocation, paths, selectedPath, stage
    });
  }

  ngOnChanges() {
    const { locations, selectedLocation, paths, selectedPath, stage } = this;
    this.boardEditService.update({
      locations, selectedLocation, paths, selectedPath, stage
    });
  }

}
