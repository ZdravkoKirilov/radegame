import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { Faction, GameAction } from '../../../game-mechanics/models/index';
import { SaveFactionAction } from '../../state/actions/byFeature/factionActions';
import { selectResources } from '../../state/reducers/selectors';
import { BaseControl } from '../../../dynamic-forms/models/Base';
import { FACTION_DEF } from '../../utils/form-definitions';

@Component({
    selector: 'rg-smart-faction-editor',
    templateUrl: './smart-faction-editor.component.html',
    styleUrls: ['./smart-faction-editor.component.scss']
})
export class SmartFactionEditorComponent implements OnInit, OnDestroy {

    constructor(private store: Store<AppState>) {
    }

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    private storeSub: Subscription;
    public controls: BaseControl<any>[];

    public saveCharacter(data: Faction): void {
        this.store.dispatch(new SaveFactionAction(data));
        this.save.emit();
    }

    public cancelAction(): void {
        this.cancel.emit();
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            const resources = selectResources(state);
            this.controls = FACTION_DEF(Object.values(resources));
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
