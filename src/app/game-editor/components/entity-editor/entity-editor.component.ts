import {
	Component, OnInit,
	Input, Output, EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { FormDefinition, BaseControl, ControlsService, ConnectedEntities } from '@app/dynamic-forms';
import { GameEntity } from '@app/game-mechanics';
import { OnChange } from '@app/shared';


@Component({
	selector: 'rg-entity-editor',
	templateUrl: './entity-editor.component.html',
	styleUrls: ['./entity-editor.component.scss'],
})
export class EntityEditorComponent implements OnInit {

	@OnChange<EntityEditorComponent, FormDefinition<GameEntity>>(function (ctx) {
		ctx.reinitialize();
	})
	@Input() formDefinition: FormDefinition<GameEntity>;

	@OnChange<EntityEditorComponent, GameEntity>(function (ctx) {
		ctx.reinitialize();
	})
	@Input() connectedEntities: ConnectedEntities;

	@OnChange<EntityEditorComponent, GameEntity>(function (ctx) {
		ctx.reinitialize();
	})
	@Input() selectedItem: GameEntity;

	@Output() update = new EventEmitter<FormGroup>();

	public form: FormGroup;
	public controls: BaseControl[];

	constructor(private cs: ControlsService) { }

	ngOnInit() {
		this.reinitialize();
	}

	private reinitialize() {
		if (this.formDefinition) {
			const currentValue = this.selectedItem || this.form?.value || {};
			this.controls = this.formDefinition(currentValue, this.connectedEntities);
			this.form = this.cs.toFormGroup(this.controls);
			this.form.valueChanges.pipe(
				startWith(currentValue),
				map(() => this.update.emit(this.form)),
			).subscribe();
		}
	}
}
