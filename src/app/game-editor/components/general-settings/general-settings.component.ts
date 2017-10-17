import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators as vd} from '@angular/forms';

import {GameBoard} from '../../../game-mechanics/models/GameBoard';
import {GameMetadata} from '../../../game-mechanics/models/GameMetadata';

@Component({
    selector: 'rg-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralSettingsComponent implements OnInit {
    @Input() boardTypes: GameBoard[];
    @Input() gameBoards: any;
    @Output() change: EventEmitter<GameMetadata> = new EventEmitter<GameMetadata>();

    public rForm: FormGroup;
    public allowedMovements: string[];

    constructor(private fb: FormBuilder) {
        this.rForm = fb.group({
            'title': [null, vd.compose([vd.required, vd.minLength(3)])],
            'boardType': [null, vd.required],
            'movements': [null, vd.required],
            'image': [null, vd.required],
            'boardWidth': [null],
            'boardHeight': [null]
        });
    }

    handleSliderChange(data: GameMetadata): void {
        this.rForm.patchValue(data);
    }

    handleFile(file): void {
        this.rForm.patchValue({image: file});
    }

    isValid(name): boolean {
        return this.rForm.get(name).valid;
    }

    getSupportedMoves(boardType: string): string[] {
        return this.gameBoards[boardType] ? this.gameBoards[boardType].allowedMovements : [];
    }

    ngOnInit() {
        this.rForm.valueChanges
            .subscribe((data: GameMetadata) => this.change.emit(data));
        this.rForm.get('boardType').valueChanges
            .subscribe(() => {
                this.rForm.get('movements').reset();
                this.allowedMovements = this.getSupportedMoves(this.rForm.get('boardType').value);
            });
    }
}
