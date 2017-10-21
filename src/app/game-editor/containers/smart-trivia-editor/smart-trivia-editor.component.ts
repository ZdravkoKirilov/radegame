import { Component, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../state-store/index';
import { SaveTriviaAction } from '../../state/actions/actions';
import { Trivia } from '../../../game-mechanics/models/index';

@Component({
  selector: 'rg-smart-trivia-editor',
  templateUrl: './smart-trivia-editor.component.html',
  styleUrls: ['./smart-trivia-editor.component.scss']
})
export class SmartTriviaEditorComponent {

  constructor(private store: Store<AppState>) {
  }

  @Output() save: EventEmitter<Trivia> = new EventEmitter();
  @Output() cancel: EventEmitter<Trivia> = new EventEmitter();

  public saveTrivia(data: Trivia) {
    this.store.dispatch(new SaveTriviaAction(data));
    this.save.emit(data);
  }
  public cancelAction() {
    this.cancel.emit();
  }

}
