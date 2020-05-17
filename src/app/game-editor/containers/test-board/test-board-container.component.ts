import { Component, OnInit } from '@angular/core';

import { Sandbox } from '@app/game-mechanics';
import { FormDefinition } from '@app/dynamic-forms';

import { composeSandboxLimitedForm } from '../../forms';

@Component({
  selector: 'rg-test-board-container',
  template: `
    <header>
      <rg-test-board-header (onRun)="handleRun()" (onApply)="handleApply()" (onSave)="handleSave()" (onDelete)="handleDelete()">
      </rg-test-board-header>
    </header>
    <rg-test-board-state [formDefinition]="form" [initialSandbox]="savedSandbox" (onChange)="handleSandboxChange($event)">
    </rg-test-board-state>
    <rg-test-board-presentation *ngIf="rerunId > 0"></rg-test-board-presentation>
  `,
  styles: [`
    :host {
      display: block;
      overflow: auto;
      height: 100vh;
    }
    header {
        position: sticky;
        top: 0;
        background: #ffffff;
        z-index: 1;
    }
  `]
})
export class TestBoardContainerComponent implements OnInit {
  form: FormDefinition = composeSandboxLimitedForm;
  savedSandbox: Sandbox;
  draftSandbox: Sandbox;

  updateId = 0;
  rerunId = 0;

  constructor() { }

  ngOnInit(): void {
    this.savedSandbox = {};
    this.draftSandbox = {};
  }

  handleSandboxChange(newValue: Sandbox) {
    this.draftSandbox = newValue;
  }

  handleApply() {
    this.updateId += 1;
  }
  handleRun() {
    this.rerunId += 1;
  }
  handleSave() {

  }
  handleDelete() {

  }

}
