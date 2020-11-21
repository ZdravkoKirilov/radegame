import { Component, Output, EventEmitter, Input, ElementRef, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseControl } from '../../models';

@Component({
  selector: 'rg-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild('editor_host', { static: true }) $domHost: ElementRef<HTMLDivElement>;

  @Input() data: BaseControl;
  @Input() form: FormGroup;
  @Output() change: EventEmitter<any> = new EventEmitter();

  loading = true;

  ngAfterViewInit() {
    this.loadMonacoEditor();
  }

  async loadMonacoEditor() {
    if (this.$domHost.nativeElement) {
      const monaco = await import('monaco-editor');
      const ref = monaco.editor.create(this.$domHost.nativeElement, {
        value: this.data.value,
        language: "javascript",
        theme: "vs-dark",
      });

      ref.onDidChangeModelContent(() => {
        this.change.emit({
          [this.data.name]: ref.getValue()
        });
      });

      this.loading = false;
    }
  }

}
