import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/state/index';
import { BoardField, Game, Resource } from '../../../game-mechanics/models/index';
import { FIELD_DEF } from '../../utils/form-definitions';
import { SaveFieldAction } from '../../state/actions/byFeature/fieldActions';
import { selectGame, selectResources } from '../../state/reducers/selectors';
import { formatBoardField_output } from '../../state/transformations/fields';

@Component({
    selector: 'rg-smart-field-editor',
    templateUrl: './smart-field-editor.component.html',
    styleUrls: ['./smart-field-editor.component.scss']
})
export class SmartFieldEditorComponent implements OnInit, OnDestroy {

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Input() field: BoardField;
    private storeSub: Subscription;
    private game: Game;
    public formDefinition = FIELD_DEF;
    public resources: Resource[];

    constructor(private store: Store<AppState>) {
    }

    handleSave(field: BoardField) {
        if (this.field && this.field.id) {
            field = {...field, id: this.field.id};
        }
        field.game = this.game.id;
        const formatted = formatBoardField_output(this.field, field);
        this.store.dispatch(new SaveFieldAction(formatted));
        this.save.emit(field);
    }

    handleCancel() {
        this.cancel.emit();
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.resources = selectResources(state);
            this.game = selectGame(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
