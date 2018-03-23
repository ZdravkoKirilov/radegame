import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms';
import { Round } from '../../../../game-mechanics';
import { EditorBase } from '../../../mixins';

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
