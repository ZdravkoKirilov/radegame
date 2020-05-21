import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Sandbox, ExpressionContext, Widget, RuntimeSandbox, enrichSandbox } from '@app/game-mechanics';
import { FormDefinition } from '@app/dynamic-forms';
import { AppState } from '@app/core';
import { AutoUnsubscribe, OnChange } from '@app/shared';

import { composeSandboxLimitedForm } from '../../forms';
import { getActiveWidget, selectExpressionContext } from '../../state';

@AutoUnsubscribe()
@Component({
  selector: 'rg-test-board-container',
  template: `
  <ng-container *ngIf="savedSandbox">
    <header>
      <rg-test-board-header (onRun)="handleRun()" (onApply)="handleApply()" (onSave)="handleSave()" (onDelete)="handleDelete()">
      </rg-test-board-header>
    </header>
    <rg-test-board-state [formDefinition]="form" [initialSandbox]="savedSandbox" (onChange)="handleSandboxChange($event)">
    </rg-test-board-state>
    <rg-test-board-presentation 
      *ngIf="rerunId > 0; else loadingTemp" 
      [widget]="widget" 
      [rerunId]="rerunId" 
      [updateId]="updateId"
      [assets]="context?.conf?.images"
      [sandbox]="runtimeDraftSandbox"
    ></rg-test-board-presentation>

    <ng-template #loadingTemp><strong>Loading...</ strong></ng-template>
  </ng-container>
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
  data$: Subscription;

  form: FormDefinition = composeSandboxLimitedForm;
  savedSandbox: Sandbox;

  @OnChange<Sandbox>(function (sandbox) {
    const self: TestBoardContainerComponent = this;
    self.runtimeDraftSandbox = enrichSandbox(self.context, sandbox);
  })
  draftSandbox: Sandbox;

  runtimeDraftSandbox: RuntimeSandbox;

  context: ExpressionContext;
  widget: Widget;

  updateId = 0;
  rerunId = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.data$ = combineLatest(
      this.store.pipe(select(getActiveWidget)),
      this.store.pipe(map(state => selectExpressionContext(state))), // TODO: we probably don't need the limited editor context),
    ).pipe(
      filter(results => results.every(Boolean)),
      map(([widget, context]) => {
        this.context = context;
        this.widget = widget;

        this.savedSandbox = {};
        this.draftSandbox = { ...this.savedSandbox };
      })
    ).subscribe();
  }

  handleSandboxChange(newValue: Sandbox) {
    this.draftSandbox = newValue;
  }

  handleApply() {
    this.updateId += 1;
  }

  handleRun() {
    if (this.runtimeDraftSandbox?.preload && this.runtimeDraftSandbox?.load_done) {
      if (!this.runtimeDraftSandbox.load_done()) {
        this.rerunId += 1;
        this.runtimeDraftSandbox.preload();
      }
    } else {
      this.rerunId += 1;
    }
  }
  handleSave() {

  }
  handleDelete() {

  }

}
