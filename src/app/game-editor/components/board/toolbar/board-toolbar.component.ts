import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `

    <rg-image-picker [data]="{hideThumbnail: true}">{{backgroundText}}</rg-image-picker>
    <button mat-button color="primary" (click)="showLocationEditor.emit()">Add location</button>
    <button *ngIf="selectedLocation" mat-button color="primary">Edit location</button>
    <button *ngIf="selectedLocation" mat-button color="warn">Delete location</button>

    <button mat-button color="primary" (click)="showPathEditor.emit()">Add path</button>
    <button *ngIf="selectedPath" mat-button color="primary">Edit path</button>
    <button *ngIf="selectedPath" mat-button color="warn">Delete path</button>
    <button mat-button>{{pathCreationText}}</button>
    
  `,
  styles: [`
  :host {
    display: flex;
  }
  `]
})
export class BoardToolbarComponent {

  @Output() showLocationEditor = new EventEmitter();
  @Output() showPathEditor = new EventEmitter();

  @Input() selectedLocation: boolean;
  @Input() selectedPath: boolean;

  get backgroundText() {
    return 'Add background';
  }

  get pathCreationText() {
    return 'Enter path creation mode';
  }

}
