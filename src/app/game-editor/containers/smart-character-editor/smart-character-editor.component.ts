import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../state-store/index';
import { Character } from '../../../game-mechanics/models/Character';
import { SaveCharacterAction } from '../../state/actions/actions';

@Component({
  selector: 'rg-smart-character-editor',
  templateUrl: './smart-character-editor.component.html',
  styleUrls: ['./smart-character-editor.component.scss']
})
export class SmartCharacterEditorComponent {

  constructor(private store: Store<AppState>) { }
    @Input() supportedAbilities: string[];
    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();

    public saveCharacter(data: Character): void {
        this.store.dispatch(new SaveCharacterAction(data));
        this.save.emit();
    }
    public cancelAction(): void {
        this.cancel.emit();
    }
}
