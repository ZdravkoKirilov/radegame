import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators as vd} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state-store/index';
import * as actions from '../../state/actions/actions';
import { FEATURE_NAME } from '../../config';
import { GameEditorFeature } from '../../state/reducers/index';

import { GameBoards } from '../../../game-mechanics/configs/game-board-types';
import {GameBoard} from '../../../game-mechanics/models/GameBoard';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnDestroy {
    readonly storeBranch: string = 'metadata';
    private storeSub: Subscription;
    private formSub: Subscription;
    public rForm: FormGroup;
    public boardTypes: GameBoard[] = Object.values(GameBoards);
    public allowedMovements: string[];

    static getSupportedMoves(boardType: string): string[] {
        return GameBoards[boardType].allowedMovements;
    }

    constructor(private fb: FormBuilder, private store: Store<AppState>) {
        this.rForm = fb.group({
            'title': [null, vd.compose([vd.required, vd.minLength(3)])],
            'boardType': [null, vd.required]
        });
        this.formSub = this.rForm.valueChanges.subscribe(data => {
            this.store.dispatch(actions.updateField({
                branch: this.storeBranch,
                data
            }));
            this.allowedMovements = GeneralSettingsComponent.getSupportedMoves(this.rForm.get('boardType').value);
        });
        this.storeSub = this.store.select(FEATURE_NAME)
            .map((data: GameEditorFeature) => {
                // this.rForm.patchValue(data[this.storeBranch]);
                console.log(data);
            })
            .subscribe();
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
        this.formSub.unsubscribe();
    }

    isValid(name) {
        return this.rForm.get(name).valid;
    }
}
