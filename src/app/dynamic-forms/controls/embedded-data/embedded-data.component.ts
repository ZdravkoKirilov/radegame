import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';
import { ControlsService } from '../../services';

@Component({
  selector: 'rg-embedded-data',
  templateUrl: './embedded-data.component.html',
  styleUrls: ['./embedded-data.component.scss']
})
export class EmbeddedDataComponent implements OnInit {

  @Input() data: BaseControl;
  @Input() form: FormGroup;
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private cs: ControlsService) { }

  private draft: any;

  ngOnInit() {
    this.draft = { ...this.data.value };
    this.ownGroup = this.cs.toFormGroup(this.data.embeddedChildren);
  }

  ownGroup: FormGroup;

  handleChange({ data, group }) {
    this.draft = {
      ...this.draft,
      ...data,
    };
    let asString = '';
    try {
      asString = JSON.stringify(this.draft);
    } catch (err) { }
   
    this.change.emit({
      [this.data.name]: asString,
    });
  }

  composeDataWithChildren() {
    if (this.data) {
      return {
        ...this.data,
        children: this.data.embeddedChildren
      };
    }
    return {};
  }

}
