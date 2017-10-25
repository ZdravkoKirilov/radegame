import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {AppState} from '../../../state-store/index';
import {BaseControl} from '../../../dynamic-forms/models/Base';
import { BoardField } from '../../../game-mechanics/models/index';
import {FIELD_SETTINGS} from '../../configs/form-definitions';

@Component({
    selector: 'rg-smart-field-editor',
    templateUrl: './smart-field-editor.component.html',
    styleUrls: ['./smart-field-editor.component.scss']
})
export class SmartFieldEditorComponent implements OnInit {

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    public controls: Observable<BaseControl<any>[]>;

    constructor(private store: Store<AppState>) {
    }

    handleSave(data: BoardField) {
        this.save.emit();
    }
    handleCancel() {
        this.cancel.emit();
    }

    ngOnInit() {
        setTimeout(() => this.controls = this.store.map(state => FIELD_SETTINGS([])));
    }

}
