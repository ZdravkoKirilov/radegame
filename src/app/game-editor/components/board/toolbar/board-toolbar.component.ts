import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `
    <rg-image-picker [data]="{hideThumbnail: true}">Add background</rg-image-picker>
  `,
  styles: []
})
export class BoardToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
