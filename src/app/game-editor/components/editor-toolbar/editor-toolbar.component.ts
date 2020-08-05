import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rg-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorToolbarComponent {

  @Input() saveEnabled: boolean;
  @Input() mode: 'edit' | 'add' = 'edit';

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  @Output() add = new EventEmitter();

}
