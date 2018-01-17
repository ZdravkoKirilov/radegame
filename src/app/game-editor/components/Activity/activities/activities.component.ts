import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Activity } from '../../../../game-mechanics/models/index';
import { FormDefinition } from '../../../../dynamic-forms/models/FormDefinition.model';
import { Resource } from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameActionsComponent {
    @Input() showEditor: boolean;
    @Input() selectedItem: Activity;
    @Input() items: Activity[];
    @Input() formDefinition: FormDefinition;
    @Input() resources: Resource[];

    @Output() toggleEditor: EventEmitter<boolean> = new EventEmitter();
    @Output() editItem: EventEmitter<Activity> = new EventEmitter();
    @Output() saveItem: EventEmitter<Activity> = new EventEmitter();
    @Output() removeItem: EventEmitter<Activity> = new EventEmitter();

    constructor() {
    }

    showActivityEditor() {
        this.toggleEditor.emit(true);
    }

    hideActivityEditor() {
        this.toggleEditor.emit(false);
    }
}
