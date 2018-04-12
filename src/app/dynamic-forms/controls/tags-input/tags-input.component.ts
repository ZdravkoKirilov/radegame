import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';
import { KEYCODES } from '@app/shared';

@Component({
  selector: 'rg-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent implements OnInit {

  @ViewChild('someInput') input: ElementRef;
  @Input() form: FormGroup;
  @Input() data: BaseControl;
  @Output() change: EventEmitter<any> = new EventEmitter();

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
    if (!this.tags.findIndex(tag)) {
      this.tags.push(tag);
    }
  }

  handleChange(event: KeyboardEvent) {
    event.stopPropagation();
    if (event.keyCode === KEYCODES.ENTER) {
      const value = this.input.nativeElement.value;
      if (value) {
        this.addTag(value);
        this.value = this.tags.join(TagsInputComponent.delimiter);
        this.change.emit({
          [this.data.name]: this.value
        });
        this.input.nativeElement.value = '';
      }
    }
  }

  ngOnInit() {
    const { value } = this.data;
    if (value) {
      this.tags = [...value.split(TagsInputComponent.delimiter)];
    }
  }
}
