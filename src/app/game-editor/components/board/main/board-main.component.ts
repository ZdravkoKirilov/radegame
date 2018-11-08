import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { BoardEditService } from '../../../services';
import { LocationEntity, PathEntity, Stage } from '@app/game-mechanics';

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

  @Input() locations: LocationEntity[];
  @Input() selectedLocation: LocationEntity;

  @Input() paths: PathEntity[];
  @Input() selectedPath: PathEntity;

  @Input() stage: Stage;

  constructor(private boardEditService: BoardEditService) { }

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
