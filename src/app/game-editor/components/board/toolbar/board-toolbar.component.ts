import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `

    <button mat-button color="primary" (click)="showSlotEditor.emit()">Add slot</button>
    <button *ngIf="selectedSlot" mat-button color="primary" (click)="showSlotEditor.emit()">Edit slot</button>
    <button *ngIf="selectedSlot" mat-button color="warn" (click)="deleteSlot.emit()">Delete slot</button>

    <button mat-button color="primary" (click)="showPathEditor.emit()">Add path</button>
    <button *ngIf="selectedPath" mat-button color="primary" (click)="showPathEditor.emit()">Edit path</button>
    <button *ngIf="selectedPath" mat-button color="warn" (click)="deletePath.emit()">Delete path</button>
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

  @Output() deletePath = new EventEmitter();
  @Output() deleteSlot = new EventEmitter();

  @Input() selectedSlot: boolean;
  @Input() selectedPath: boolean;

  get pathCreationText() {
    return 'Enter path creation mode';
  }

}
