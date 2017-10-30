import {Component, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {BaseControl} from '../../../../dynamic-forms/models/Base';
import {ControlsService} from '../../../../dynamic-forms/services/controls.service';
import { Game } from '../../../../game-mechanics/models/Game';

@Component({
    selector: 'rg-game-launch',
    templateUrl: './game-launch.component.html',
    styleUrls: ['./game-launch.component.scss']
})
export class GameLaunchComponent implements OnChanges {
    @Output() create: EventEmitter<any> = new EventEmitter();
    @Input() controls: BaseControl<any>[] = [];
    @Input() games: Game[];
    public form: FormGroup;

    constructor(private cs: ControlsService) {

    }

    handleGameCreate() {
        const value: Game = this.form.value;
        value.boardType = value.boardType[0];
        this.create.emit(value);
    }

    ngOnChanges(c: SimpleChanges) {
        if (c.controls && c.controls.currentValue && c.controls.currentValue !== c.controls.previousValue) {
            this.form = this.cs.toFormGroup(this.controls);
        }
    }
}
