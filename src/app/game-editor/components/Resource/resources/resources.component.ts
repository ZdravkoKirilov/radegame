import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import {Resource} from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent {

    constructor() {
    }

    @Input() resources: Resource[];
    @Input() showEditor;
    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() removeResource: EventEmitter<Resource> = new EventEmitter();

    showResourceEditor() {
        this.toggleEditor.emit(true);
    }

    saveResource() {
        this.toggleEditor.emit(false);
    }

    hideResourceEditor() {
        this.toggleEditor.emit(false);
    }
}
