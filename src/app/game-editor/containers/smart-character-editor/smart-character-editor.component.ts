import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { Character, GameAction } from '../../../game-mechanics/models/index';
import { SaveCharacterAction } from '../../state/actions/byFeature/characterActions';
import { selectResources } from '../../state/reducers/selectors';
import { BaseControl } from '../../../dynamic-forms/models/Base';
import { CHARACTER_DEF } from '../../utils/form-definitions';

@Component({
    selector: 'rg-smart-character-editor',
    templateUrl: './smart-character-editor.component.html',
    styleUrls: ['./smart-character-editor.component.scss']
})
export class SmartCharacterEditorComponent implements OnInit, OnDestroy {

    constructor(private store: Store<AppState>) {
    }

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    private storeSub: Subscription;
    public controls: BaseControl<any>[];

    public saveCharacter(data: Character): void {
        this.store.dispatch(new SaveCharacterAction(data));
        this.save.emit();
    }

    public cancelAction(): void {
        this.cancel.emit();
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            const resources = selectResources(state);
            this.controls = CHARACTER_DEF(Object.values(resources));
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
