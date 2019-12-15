import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `

    <button mat-button color="primary" (click)="showSlotEditor.emit()">Add slot</button>
    <button *ngIf="selectedSlot" mat-button color="primary" (click)="showSlotEditor.emit()">Edit slot</button>
    <button *ngIf="selectedSlot" mat-button color="warn" (click)="deleteSlot.emit()">Delete slot</button>

    <div class="view-mode">
      <button mat-button color="primary" (click)="changeView.emit('board')">Board</button>
      <button mat-button color="primary" (click)="changeView.emit('list')">List</button>
    </div>
    
  `,
  styles: [`
  :host {
    display: flex;
  }
  .view-mode {
    flex-grow: 1;
    text-align: right;
  }
  `]
})
export class BoardToolbarComponent {

  @Output() showSlotEditor = new EventEmitter();

  @Output() deleteSlot = new EventEmitter();

  @Output() changeView = new EventEmitter<'list' | 'board'>();

  @Input() selectedSlot: boolean;

}
