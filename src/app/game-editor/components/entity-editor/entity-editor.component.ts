import {
	Component, OnInit,
	Input, Output, EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

import { FormDefinition, BaseControl, ControlsService, ConnectedEntities } from '@app/dynamic-forms';
import { GameEntity } from '@app/game-mechanics';
import { OnChange } from '@app/shared';


@Component({
	selector: 'rg-entity-editor',
	templateUrl: './entity-editor.component.html',
	styleUrls: ['./entity-editor.component.scss'],
})
export class EntityEditorComponent implements OnInit {

	@Input() formDefinition: FormDefinition;
	@Input() connectedEntities: ConnectedEntities;

	@OnChange<GameEntity>(function (value) {
		const self: EntityEditorComponent = this;
		self.controls = self.formDefinition(value, self.connectedEntities);
		self.form = self.cs.toFormGroup(self.controls);
		self.form.valueChanges.pipe(
			map(() => self.update.emit(this.form)),
		).subscribe();
	})
	@Input() selectedItem: GameEntity;

	@Output() update = new EventEmitter<FormGroup>();

	public form: FormGroup;
	public controls: BaseControl[];

	constructor(private cs: ControlsService) { }

	ngOnInit() {
		if (this.formDefinition) {
			this.controls = this.formDefinition(this.selectedItem, this.connectedEntities);
			this.form = this.cs.toFormGroup(this.controls);
			this.form.valueChanges.pipe(
				map(() => this.update.emit(this.form)),
			).subscribe();
		}
	}
}
