import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms';
import { Quest } from '../../../../game-mechanics';
import { EditorBase } from '../../../mixins';

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
