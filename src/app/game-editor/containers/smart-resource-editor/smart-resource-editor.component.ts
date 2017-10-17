import {Component, Output, EventEmitter} from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../state-store/index';
import { Resource } from '../../../game-mechanics/models/Resource';
import { SaveResourceAction } from '../../state/actions/actions';

@Component({
    selector: 'rg-smart-resource-editor',
    templateUrl: './smart-resource-editor.component.html',
    styleUrls: ['./smart-resource-editor.component.scss']
})
export class SmartResourceEditorComponent {

    constructor(private store: Store<AppState>) {
    }

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    public saveResource(data: Resource) {
        this.store.dispatch(new SaveResourceAction(data));
        this.save.emit();
    }
    public cancelAction() {
        this.cancel.emit();
    }
}
