import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/index';
import { Resource, Game } from '../../../game-mechanics/models/index';
import { SaveResourceAction } from '../../state/actions/byFeature/resourceActions';
import { BaseControl } from '../../../dynamic-forms/models/Base';
import { RESOURCE_DEF } from '../../utils/form-definitions';

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

    public controls: BaseControl<any>[] = RESOURCE_DEF();

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
