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

  ownGroup: FormGroup;

  private embeddedChildren: BaseControl[];
  private draft: any;

  ngOnInit() {
    const def = this.data.childrenDefinition;
    try {
      this.data.value = JSON.parse(this.data.value);
    } catch {
      this.data.value = {};
    }
    this.draft = { ...this.data.value };
    this.embeddedChildren = def(this.draft, this.data.connectedEntities);
    this.ownGroup = this.cs.toFormGroup(this.embeddedChildren);
  }

  handleChange({ data }: any) {
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
    if (this.data && this.embeddedChildren) {
      return {
        ...this.data,
        children: this.embeddedChildren
      };
    }
    return {};
  }

}
