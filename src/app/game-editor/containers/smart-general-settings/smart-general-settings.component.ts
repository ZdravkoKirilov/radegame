import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state-store/index';
import * as actions from '../../state/actions/actions';

import { GameBoards } from '../../../game-mechanics/configs/game-board-types';
import { GameBoard } from '../../../game-mechanics/models/GameBoard';
import { GameMetadata } from '../../../game-mechanics/models/GameMetadata';

@Component({
    selector: 'rg-smart-general-settings',
    templateUrl: './smart-general-settings.component.html',
    styleUrls: ['./smart-general-settings.component.scss']
})
export class SmartGeneralSettingsComponent {
    readonly storeBranch: string = 'metadata';
    public gameBoards = GameBoards;
    public boardTypes: GameBoard[] = Object.values(GameBoards);

    constructor(private store: Store<AppState>) {
    }

    handleFormValueChange(data: GameMetadata): void {
        this.store.dispatch(new actions.UpdateFieldAction({
            branch: this.storeBranch,
            data
        }));
    }
}
