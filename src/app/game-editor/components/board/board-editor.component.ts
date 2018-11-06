import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rg-board-editor',
  template: `
    <div>
      <rg-board-toolbar></rg-board-toolbar>
      <rg-board-main></rg-board-main>
    </div>
  `,
  styles: []
})
export class BoardEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
