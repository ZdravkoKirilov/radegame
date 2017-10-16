import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators as vd } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state-store/index';
import * as actions from '../../state/actions/actions';
import { FEATURE_NAME } from '../../config';
import { GameEditorFeature } from '../../state/models/GameEditorFeature';

import { GameBoards } from '../../../game-mechanics/configs/game-board-types';
import { GameBoard } from '../../../game-mechanics/models/GameBoard';
import { GameMetadata } from '../../../game-mechanics/models/GameMetadata';

@Component({
    selector: 'rg-smart-general-settings',
    templateUrl: './smart-general-settings.component.html',
    styleUrls: ['./smart-general-settings.component.scss']
})
export class SmartGeneralSettingsComponent implements OnDestroy, OnInit {
    readonly storeBranch: string = 'metadata';
    private storeSub: Subscription;
    private formSubs: Subscription[] = [];
    private gameBoards = GameBoards;
    public rForm: FormGroup;
    public boardTypes: GameBoard[] = Object.values(GameBoards);
    public allowedMovements: string[];

    constructor(private fb: FormBuilder, private store: Store<AppState>) {
        this.rForm = fb.group({
            'title': [null, vd.compose([vd.required, vd.minLength(3)])],
            'boardType': [null, vd.required],
            'movements': [null, vd.required],
            'image': [null, vd.required],
            'boardWidth': [null],
            'boardHeight': [null]
        });
    }

    handleFormValueChange(data: GameMetadata): void {
        this.store.dispatch(new actions.UpdateFieldAction({
            branch: this.storeBranch,
            data
        }));
    }

    handleSliderChange(data: GameMetadata): void {
        this.rForm.patchValue(data);
    }

    handleFileUpload(data: GameMetadata): void {
        this.rForm.patchValue(data);
    }

    getSupportedMoves(boardType: string): string[] {
        return this.gameBoards[boardType] ? this.gameBoards[boardType].allowedMovements : [];
    }

    ngOnDestroy() {
        this.formSubs.forEach((sub: Subscription) => sub.unsubscribe());
    }

    ngOnInit() {
        this.formSubs.push(this.rForm.valueChanges
            .subscribe((data: GameMetadata) => this.handleFormValueChange(data)));
        this.formSubs.push(this.rForm.get('boardType').valueChanges
            .subscribe(() => {
                this.rForm.get('movements').reset();
                this.allowedMovements = this.getSupportedMoves(this.rForm.get('boardType').value);
            }));
    }
}
