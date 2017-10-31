import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/state/index';
import { BaseControl } from '../../../dynamic-forms/models/Base';
import { BoardField } from '../../../game-mechanics/models/index';
import { GridFieldPayload } from '../../models/index';
import { FieldCoord } from '../../models/index';
import { FIELD_DEF } from '../../configs/form-definitions';
import { SaveFieldAction } from '../../state/actions/byFeature/fieldActions';

@Component({
    selector: 'rg-smart-field-editor',
    templateUrl: './smart-field-editor.component.html',
    styleUrls: ['./smart-field-editor.component.scss']
})
export class SmartFieldEditorComponent implements OnInit {

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() fieldCoord: FieldCoord;
    @Input() field: BoardField;
    public controls: Observable<BaseControl<any>[]>;

    constructor(private store: Store<AppState>) {
    }

    handleSave(field: BoardField) {
        const payload: GridFieldPayload = {
            coords: this.fieldCoord,
            data: field
        };
        this.store.dispatch(new SaveFieldAction(payload));
        this.save.emit(field);
    }

    handleCancel() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.controls = this.store.map(state => FIELD_DEF([]));
    }

}
