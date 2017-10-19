import {Component, Input} from '@angular/core';

import {Character} from '../../../game-mechanics/models/Character';

@Component({
    selector: 'rg-characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

    constructor() {
    }

    @Input() characters: Character[];
    public showEditor = false;

    showCharacterEditor() {
        this.showEditor = true;
    }

    saveCharacter() {
        this.showEditor = false;
    }

    hideCharacterEditor() {
        this.showEditor = false;
    }
}
