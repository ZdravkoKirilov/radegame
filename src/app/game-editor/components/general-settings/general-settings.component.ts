import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators as vd} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state-store/index';
import * as actions from '../../state/actions/actions';
import {FEATURE_NAME} from '../../config';
import {GameEditorFeature} from '../../state/reducers/index';

import {GameBoards} from '../../../game-mechanics/configs/game-board-types';
import {GameBoard} from '../../../game-mechanics/models/GameBoard';
import {GameMetadata} from '../../../game-mechanics/models/GameMetadata';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnDestroy, OnInit {
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
        this.store.dispatch(actions.updateField({
            branch: this.storeBranch,
            data
        }));
        this.allowedMovements = this.getSupportedMoves(this.rForm.get('boardType').value);
    }

    handleFileUpload(file) {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.rForm.patchValue({'image': reader.result});
            };
            reader.readAsDataURL(file);
        }
    }

    handleSliderChange(data: {name: string, value: number}) {
        this.rForm.patchValue({
            [data.name]: data.value
        });
    }

    getSupportedMoves(boardType: string): string[] {
        return this.gameBoards[boardType] ? this.gameBoards[boardType].allowedMovements : [];
    }

    isValid(name) {
        return this.rForm.get(name).valid;
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
        this.formSubs.forEach((sub: Subscription) => sub.unsubscribe());
    }

    ngOnInit() {
        this.formSubs.push(this.rForm.valueChanges.subscribe((data: GameMetadata) => this.handleFormValueChange(data)));
        this.formSubs.push(this.rForm.get('boardType').valueChanges.subscribe(() => this.rForm.get('movements').reset()));
        this.storeSub = this.store.select(FEATURE_NAME)
            .map((data: GameEditorFeature) => {
                console.log(data);
            })
            .subscribe();
    }
}
