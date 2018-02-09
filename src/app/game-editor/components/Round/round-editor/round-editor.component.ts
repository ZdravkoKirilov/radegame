import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Round } from '../../../../game-mechanics/models/index';
import { EditorBase } from '../../../mixins/editor.base';

@Component({
    selector: 'rg-round-editor',
    templateUrl: './round-editor.component.html',
    styleUrls: ['./round-editor.component.scss']
})
export class RoundEditorComponent extends EditorBase<Round> {

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
