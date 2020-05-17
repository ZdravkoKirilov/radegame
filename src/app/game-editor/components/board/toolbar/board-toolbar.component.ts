import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'rg-board-toolbar',
  template: `

    <button mat-button color="primary" (click)="showNodeEditor.emit()">Add node</button>
    <button *ngIf="selectedNode" mat-button color="primary" (click)="showNodeEditor.emit()">Edit node</button>
    <button *ngIf="selectedNode" mat-button color="warn" (click)="deleteNode.emit()">Delete node</button>

    <div class="view-mode">
      <button mat-button color="primary" (click)="changeView.emit('board')">Board</button>
      <button mat-button color="primary" (click)="changeView.emit('list')">List</button>

      <a [routerLink]="['../live-test']">Live test</a>
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

  @Output() showNodeEditor = new EventEmitter();

  @Output() deleteNode = new EventEmitter();

  @Output() changeView = new EventEmitter<'list' | 'board'>();

  @Input() selectedNode: boolean;

}
