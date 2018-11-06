import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rg-board-container',
  template: `
    <rg-board-editor></rg-board-editor>
  `,
  styles: []
})
export class BoardContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
