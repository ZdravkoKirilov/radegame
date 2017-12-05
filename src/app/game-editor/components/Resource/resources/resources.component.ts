import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Resource, Game } from '../../../../game-mechanics/models/index';

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
    @Input() game: Game;
    @Input() selectedItem: Resource;
    @Input() showEditor: boolean;

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editResource: EventEmitter<Resource> = new EventEmitter();
    @Output() removeResource: EventEmitter<Resource> = new EventEmitter();

    showResourceEditor() {
        this.toggleEditor.emit(true);
    }

    saveResource() {
        this.hideResourceEditor();
    }

    hideResourceEditor() {
        this.toggleEditor.emit(false);
    }
}
