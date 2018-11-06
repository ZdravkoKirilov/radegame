import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BoardEditService } from '../../../services';

@Component({
  selector: 'rg-board-main',
  template: `
    <div class="canvas-wrapper" #canvasWrapper tabindex="0"></div>
  `,
  styles: []
})
export class BoardMainComponent implements OnInit {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef<HTMLDivElement>;

  constructor(private boardEditService: BoardEditService) { }

  ngOnInit() {
    this.boardEditService.initialize(this.canvasWrapper.nativeElement);
  }

}
