import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `

    <rg-image-picker [data]="{hideThumbnail: true}">{{backgroundText}}</rg-image-picker>
    <button mat-button color="primary" (click)="showSlotEditor.emit()">Add slot</button>
    <button *ngIf="selectedSlot" mat-button color="primary">Edit slot</button>
    <button *ngIf="selectedSlot" mat-button color="warn">Delete slot</button>

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

  @Output() showSlotEditor = new EventEmitter();
  @Output() showPathEditor = new EventEmitter();

  @Input() selectedSlot: boolean;
  @Input() selectedPath: boolean;

  get backgroundText() {
    return 'Add background';
  }

  get pathCreationText() {
    return 'Enter path creation mode';
  }

}
