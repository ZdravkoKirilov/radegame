import { Component } from '@angular/core';

import { Faction } from '../../../../game-mechanics/models/index';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { EditorBase } from '../../mixins/editor.base';

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
