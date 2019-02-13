import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'rg-edit-header',
	templateUrl: './edit-header.component.html',
	styleUrls: ['./edit-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditHeaderComponent {

	@Input() showEditor: boolean;
	@Input() title: string;
	@Input() showButtons = true;
	@Input() saveEnabled: boolean;

	@Output() save = new EventEmitter();
	@Output() cancel = new EventEmitter();
	@Output() add = new EventEmitter();
}
