import { Component } from '@angular/core';

import { Faction } from '../../../../game-mechanics';
import { ControlsService } from '../../../../dynamic-forms';
import { EditorBase } from '../../../mixins';

@Component({
    selector: 'rg-faction-editor',
    templateUrl: './faction-editor.component.html',
    styleUrls: ['./faction-editor.component.scss']
})
export class FactionEditorComponent extends EditorBase<Faction> {

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
