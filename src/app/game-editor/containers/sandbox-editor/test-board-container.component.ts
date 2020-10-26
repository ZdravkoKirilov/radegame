import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';

import { Sandbox, ExpressionContext, Widget, RuntimeSandbox, SandboxType, WidgetNode, Module, AllEntity, ALL_ENTITIES, GameId } from '@app/game-mechanics';
import { FormDefinition } from '@app/dynamic-forms';
import { AppState } from '@app/core';
import { AutoUnsubscribe, OnChange, selectRouteData, selectGameId } from '@app/shared';

import { composeSandboxForm } from '../../forms';
import { getActiveWidget, getActiveNode, getActiveModule, getActiveSandbox, FetchItemsAction, selectSandboxExpressionContext, SaveItemAction, SetItemAction, genericActionTypes } from '../../state';

@AutoUnsubscribe()
@Component({
  selector: 'rg-test-board-container',
  template: `
  <ng-container *ngIf="savedSandbox">
    <header>
      <rg-test-board-header (onRun)="handleRun()" (onApply)="handleApply()" (onSave)="handleSave()" (onDelete)="handleClose()">
      </rg-test-board-header>
    </header>
    <rg-test-board-state [formDefinition]="form" [initialSandbox]="savedSandbox" (onChange)="handleSandboxChange($event)">
    </rg-test-board-state>
    <rg-test-board-presentation 
      *ngIf="rerunId > 0; else loadingTemp" 
      [widget]="widget || runtimeDraftSandbox?.widget"
      [node]="node || runtimeDraftSandbox?.node"
      [module]="module || runtimeDraftSandbox?.module"
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
  gameId$: Subscription;
  onEntityCreated$: Subscription;

  sandboxType: SandboxType;

  form: FormDefinition<Sandbox> = composeSandboxForm;
  savedSandbox: Sandbox;

  @OnChange<Sandbox>(function (sandbox) {
    const self: TestBoardContainerComponent = this;
    self.runtimeDraftSandbox = Sandbox.toRuntime(self.context, sandbox);
  })
  draftSandbox: Sandbox;

  runtimeDraftSandbox: RuntimeSandbox;

  context: ExpressionContext;
  widget: Widget;
  node: WidgetNode;
  module: Module;
  gameId: GameId;

  updateId = 0;
  rerunId = 0;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute, private actions$: Actions) { }

  ngOnInit(): void {

    this.data$ = combineLatest(
      this.store.pipe(select(selectGameId)),
      this.store.pipe(select(getActiveWidget)),
      this.store.pipe(select(getActiveNode)),
      this.store.pipe(select(getActiveModule)),
      this.store.pipe(select(getActiveSandbox)),
      this.store.pipe(map(state => selectSandboxExpressionContext(state))),
      this.store.pipe(select(selectRouteData), map(data => data.sandbox_type))
    ).pipe(
      map(([gameId, widget, node, module, sandbox, context, sandboxType]) => {

        this.context = context;
        this.widget = sandboxType === SandboxType.widget ? widget : null;
        this.node = node;
        this.module = module;
        this.gameId = gameId;

        this.savedSandbox = {
          ...(sandbox || {
            game: this.gameId,
            module: this.module?.id,
            widget: this.widget?.id,
            node: this.node?.id,
          })
        };
        this.draftSandbox = { ...this.savedSandbox };
      })
    ).subscribe();

    this.gameId$ = this.store.pipe(
      select(selectGameId),
      map(gameId => {
        this.store.dispatch(
          new FetchItemsAction({ key: ALL_ENTITIES.sandboxes as AllEntity, data: { gameId } })
        );
      }),
    ).subscribe();

    this.onEntityCreated$ = this.actions$.pipe(
      ofType<SetItemAction<Sandbox>>(genericActionTypes.SET_ITEM),
      map(action => {
        this.router.navigate(['../', action.payload.data.id], { relativeTo: this.route });
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
  /*   if (this.runtimeDraftSandbox?.preload && this.runtimeDraftSandbox?.load_done) {
      if (!this.runtimeDraftSandbox.load_done()) {
        this.rerunId += 1;
        this.runtimeDraftSandbox.preload();
      }
    } else {
      this.rerunId += 1;
    } */
  }

  handleSave() {
    this.store.dispatch(new SaveItemAction({
      key: ALL_ENTITIES.sandboxes,
      data: {
        ...this.draftSandbox,
        game: this.gameId,
        module: this.module?.id,
        widget: this.widget?.id,
        node: this.node?.id,
      }
    }));
  }

  handleClose() {

  }

}
