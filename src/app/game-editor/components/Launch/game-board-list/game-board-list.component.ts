import {Component, Input, Output, EventEmitter} from '@angular/core';

import { GameBoard } from '../../../../game-mechanics/models/index';

@Component({
    selector: 'rg-game-board-list',
    templateUrl: './game-board-list.component.html',
    styleUrls: ['./game-board-list.component.scss']
})
export class GameBoardListComponent {
    @Input() boards: GameBoard[];
    @Output() change: EventEmitter<string> = new EventEmitter();
    public selectedBoard: string;
    constructor() {
    }
    handleBoardPick(board: string) {
        this.selectedBoard = board;
        this.change.emit(board);
    }
}
