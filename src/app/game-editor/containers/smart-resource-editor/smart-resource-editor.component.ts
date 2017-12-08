import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/index';
import { Resource, Game } from '../../../game-mechanics/models/index';
import { SaveResourceAction } from '../../state/actions/byFeature/resource.action';
import { FormDefinition } from '../../../shared/models/FormDefinition';
import { RESOURCE_DEF } from '../../forms/resource';

@Component({
    selector: 'rg-smart-resource-editor',
    templateUrl: './smart-resource-editor.component.html',
    styleUrls: ['./smart-resource-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartResourceEditorComponent {

    constructor(private store: Store<AppState>) {
    }

    @Input() selectedItem: Resource;
    @Input() game: Game;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    public formDefinition: FormDefinition = RESOURCE_DEF;

    public saveResource(data: Resource) {
        const payload = {...data, game: this.game.id};
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveResourceAction(payload));
        this.save.emit();
    }

    public cancelAction() {
        this.cancel.emit();
    }
}
