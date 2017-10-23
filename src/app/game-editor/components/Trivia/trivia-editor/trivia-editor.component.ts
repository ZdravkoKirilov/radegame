import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators as vd } from '@angular/forms';

import { Trivia } from '../../../../game-mechanics/models/Trivia';

@Component({
  selector: 'rg-trivia-editor',
  templateUrl: './trivia-editor.component.html',
  styleUrls: ['./trivia-editor.component.scss']
})
export class TriviaEditorComponent {

  @Output() save: EventEmitter<Trivia> = new EventEmitter<Trivia>();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  public rForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'question': [null, vd.compose([vd.required, vd.minLength(3)])],
      'description': [null],
      'answer': [null, vd.required]
    });
  }

  isValid(name) {
    return this.rForm.get(name).valid;
  }

  saveGameTrivia() {
    this.save.emit(this.rForm.value);
  }

  cancelAction() {
    this.cancel.emit();
  }

  handleFileUpload(file): void {
    this.rForm.patchValue({ image: file });
  }

}
