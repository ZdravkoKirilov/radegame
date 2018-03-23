import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms';
import { Activity } from '../../../../game-mechanics';
import { EditorBase } from '../../../mixins';

@Component({
    selector: 'rg-activity-editor',
    templateUrl: './activity-editor.component.html',
    styleUrls: ['./activity-editor.component.scss']
})
export class GameActionEditorComponent extends EditorBase<Activity>{

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
