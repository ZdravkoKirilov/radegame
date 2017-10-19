import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators as vd} from '@angular/forms';

import {GameBoard} from '../../../game-mechanics/models/index';

@Component({
    selector: 'rg-game-launch',
    templateUrl: './game-launch.component.html',
    styleUrls: ['./game-launch.component.scss']
})
export class GameLaunchComponent {
    @Output() create: EventEmitter<any> = new EventEmitter();
    @Input() boards: GameBoard[];
    public form: FormGroup;

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            'gameName': [null, vd.required],
            'boardType': [null, vd.required]
        });
    }
    handleBoardChange(board: string): void {
        this.form.patchValue({
            boardType: board
        });
    }
    handleGameCreate() {
        this.create.emit(this.form.value);
    }
}
