import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';
import { ControlsService } from '../../services';

@Component({
  selector: 'rg-embedded-data',
  templateUrl: './embedded-data.component.html',
  styleUrls: ['./embedded-data.component.scss']
})
export class EmbeddedDataComponent {

  @Input() data: BaseControl;
  @Input() form: FormGroup;
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private cs: ControlsService) {
    this.ownGroup = this.cs.toFormGroup(this.data.children);

    this.ownGroup.valueChanges.subscribe(data => {
      debugger;
    });
  }

  ownGroup: FormGroup;

  handleChange(data: any) {
    debugger;
  }


}
