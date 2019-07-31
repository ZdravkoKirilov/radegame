import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';

import { BaseControl } from '../../models';

@Component({
  selector: 'rg-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent implements OnInit {

  @ViewChild('mainInput', { static: false }) input: ElementRef;
  @Input() form: FormGroup;
  @Input() data: BaseControl;
  @Output() change: EventEmitter<any> = new EventEmitter();

  separatorKeysCodes = [ENTER, COMMA];

  static readonly delimiter = ';';
  private _value: string = '';
  private _tags: string[] = [];

  constructor() {
  }

  get isValid() {
    return true;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get tags() {
    return this._tags;
  }

  set tags(value) {
    this._tags = value;
  }

  addTag(tag) {
    if (this.tags.indexOf(tag) === -1) {
      this.tags.push(tag);
    }
  }

  onAdd(event?: MatChipInputEvent) {
    const value = event.value;
    const input = event.input;
    const { maxItems } = this.data;
    const belowLimit = maxItems ? maxItems > this.tags.length : true;

    if (value && belowLimit) {
      this.addTag(value);
      this.value = this.tags.join(TagsInputComponent.delimiter);
      this.change.emit({
        [this.data.name]: this.value
      });
      input.value = '';
    }
  }

  onRemove(tag?: string) {
    let index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.value = this.tags.join(TagsInputComponent.delimiter);
      this.change.emit({
        [this.data.name]: this.value
      });
    }
  }

  ngOnInit() {
    const { value } = this.data;
    if (value) {
      this.tags = [...value.split(TagsInputComponent.delimiter)];
    }
  }
}
