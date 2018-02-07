import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Quest } from '../../../../game-mechanics/models/index';
import { EditorBase } from '../../mixins/editor.base';

@Component({
    selector: 'rg-quest-editor',
    templateUrl: './quest-editor.component.html',
    styleUrls: ['./quest-editor.component.scss']
})
export class QuestEditorComponent extends EditorBase<Quest> {

    constructor(public cs: ControlsService) {
        super(cs);
    }

}
