import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RenderService } from './services/render-service';

@Component({
  selector: 'rg-experiments-container',
  templateUrl: './experiments-container.component.html',
  styleUrls: ['./experiments-container.component.scss']
})
export class ExperimentsContainerComponent implements OnInit {

  @ViewChild('canvasWrapper') canvasWrapper: ElementRef<HTMLDivElement>;

  constructor(private renderService: RenderService) { }
  
  ngOnInit() {
    this.renderService.initialize(this.canvasWrapper.nativeElement);
  }

}
