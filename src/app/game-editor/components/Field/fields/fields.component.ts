import {Component, Input} from '@angular/core';

import {BaseControl} from '../../../../dynamic-forms/models/Base';
import {FieldCoord} from '../../../models/GridEditor';
import {BoardField} from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-fields',
    templateUrl: './fields.component.html',
    styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {
    @Input() controls: BaseControl<any>[] = [];
    public fieldCoord: FieldCoord;
    public showEditor = false;

    constructor() {
    }

    showFieldEditor(event: {
        type: any,
        data: FieldCoord
    }) {
        this.fieldCoord = event.data;
        this.showEditor = true;
    }

    hideFieldEditor() {
        this.showEditor = false;
    }

    handleSave(data: BoardField) {
        this.hideFieldEditor();
        console.log(data, this.fieldCoord);
    }
}
