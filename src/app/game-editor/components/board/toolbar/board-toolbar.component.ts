import { Component } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `

    <rg-image-picker [data]="{hideThumbnail: true}">{{backgroundText}}</rg-image-picker>
    <button mat-button color="primary">Add location</button>
    <button mat-button color="primary">Edit location</button>
    <button mat-button color="want">Delete location</button>

    <button mat-button color="wanr">Delete path</button>
    <button mat-button>{{pathCreationText}}</button>
    
  `,
  styles: [`
  :host {
    display: flex;
  }
  `]
})
export class BoardToolbarComponent {

  constructor() { }

  get backgroundText() {
    return 'Add background';
  }

  get pathCreationText() {
    return 'Enter path creation mode';
  }

}
