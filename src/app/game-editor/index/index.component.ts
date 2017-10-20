import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../state-store/index';
import {GameBoards} from '../../game-mechanics/configs/game-boards';
import { Abilities } from '../../game-mechanics/configs/abilities';
import { Movements } from '../../game-mechanics/configs/movements';
import {GameBoard, GameMetadata} from '../../game-mechanics/models/index';
import {UpdateEditorAssetsAction} from '../state/actions/assetActions';
import * as actions from '../state/actions/actions';

@Component({
    selector: 'rg-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent {
    readonly storeBranch: string = 'metadata';
    public gameBoards = GameBoards;
    public boardTypes: GameBoard[] = Object.values(GameBoards);
    public inProgress = true;

    constructor(private store: Store<AppState>) {
    }

    handleGameCreate(data: GameMetadata): void {
        this.store.dispatch(new actions.UpdateFieldAction({
            branch: this.storeBranch,
            data
        }));
        this.inProgress = true;
        this.store.dispatch(new UpdateEditorAssetsAction({
            supportedMovements: this.getSupportedMoves(data.boardType),
            supportedAbilities: this.getSupportedAbilities(data.boardType),
            abilities: Abilities,
            gameBoards: GameBoards,
            movements: Movements
        }));
    }

    getSupportedMoves(boardType: string): string[] {
        return this.gameBoards[boardType] ? this.gameBoards[boardType].allowedMovements : [];
    }

    getSupportedAbilities(boardType: string): string[] {
        return this.gameBoards[boardType] ? this.gameBoards[boardType].supportedAbilities : [];
    }
}
