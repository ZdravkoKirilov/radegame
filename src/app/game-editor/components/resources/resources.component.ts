import {Component, Input } from '@angular/core';

import { Resource } from '../../../game-mechanics/models/Resource';

@Component({
    selector: 'rg-resources',
    templateUrl: './resources.component.html',
    styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {

    constructor() {
    }
    @Input() resources: Resource[];
    public showEditor = false;

    showResourceEditor() {
        this.showEditor = true;
    }
    saveResource() {
        this.showEditor = false;
    }
    hideResourceEditor() {
        this.showEditor = false;
    }
}
