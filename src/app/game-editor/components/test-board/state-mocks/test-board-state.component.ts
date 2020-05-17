import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ControlsService, FormDefinition, BaseControl } from '@app/dynamic-forms';
import { Sandbox } from '@app/game-mechanics';
import { OnChange } from '@app/shared';

@Component({
  selector: 'rg-test-board-state',
  templateUrl: './test-board-state.component.html',
  styleUrls: ['./test-board-state.component.scss']
})
export class TestBoardStateComponent {

  @Input() formDefinition: FormDefinition;

  @OnChange<Sandbox>(function (sandbox) {
    if (sandbox) {
      this.initializeForm(sandbox);
    }
  })
  @Input() initialSandbox: Sandbox;

  @Output() onChange = new EventEmitter<Sandbox>();

  constructor(private cs: ControlsService) { }

  form: FormGroup;
  controls: BaseControl[];

  initializeForm(sandbox: Sandbox) {
    this.controls = this.formDefinition(sandbox);
    this.form = this.cs.toFormGroup(this.controls);

    this.form.valueChanges.subscribe(formValue => this.onChange.emit(formValue));
  }

}
