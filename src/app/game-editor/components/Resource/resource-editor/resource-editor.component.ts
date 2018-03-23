import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Resource } from '../../../../game-mechanics';
import { ControlsService } from '../../../../dynamic-forms';
import { EditorBase } from '../../../mixins';

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
