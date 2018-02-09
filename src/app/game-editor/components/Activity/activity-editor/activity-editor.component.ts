import { Component } from '@angular/core';

import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { Activity } from '../../../../game-mechanics/models/index';
import { EditorBase } from '../../../mixins/editor.base';

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
