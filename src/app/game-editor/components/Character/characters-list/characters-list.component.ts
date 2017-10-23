import {Component, Input} from '@angular/core';

import { Character } from '../../../../game-mechanics/models/Character';

@Component({
    selector: 'rg-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
    @Input() items: Character[];
    constructor() {
    }
}
