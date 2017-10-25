import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {AppState} from '../../../state-store/index';
import {Character, Ability} from '../../../game-mechanics/models/index';
import {SaveCharacterAction} from '../../state/actions/byFeature/characterActions';
import {selectAbilities} from '../../state/reducers/selectors';

@Component({
    selector: 'rg-smart-character-editor',
    templateUrl: './smart-character-editor.component.html',
    styleUrls: ['./smart-character-editor.component.scss']
})
export class SmartCharacterEditorComponent implements OnInit {

    constructor(private store: Store<AppState>) {
    }

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    public supportedAbilities: Observable<Ability[]>;

    public saveCharacter(data: Character): void {
        this.store.dispatch(new SaveCharacterAction(data));
        this.save.emit();
    }

    public cancelAction(): void {
        this.cancel.emit();
    }

    ngOnInit() {
        this.supportedAbilities = this.store.map(state => selectAbilities(state));
    }
}
