import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rg-test-board-header',
  templateUrl: './test-board-header.component.html',
  styleUrls: ['./test-board-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestBoardHeaderComponent {

  @Output() onRun = new EventEmitter();
  @Output() onApply = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onDelete = new EventEmitter();

}
