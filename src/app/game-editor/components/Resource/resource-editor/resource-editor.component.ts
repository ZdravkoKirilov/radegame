import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Resource } from '../../../../game-mechanics/models/index';
import { ControlsService } from '../../../../dynamic-forms/services/controls.service';
import { EditorBase } from '../../mixins/editor.base';

@Component({
    selector: 'rg-resource-editor',
    templateUrl: './resource-editor.component.html',
    styleUrls: ['./resource-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceEditorComponent extends EditorBase<Resource> {

    constructor(public cs: ControlsService) {
        super(cs);
    }
}
