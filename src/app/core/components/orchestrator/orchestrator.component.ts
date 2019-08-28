import { Component } from '@angular/core';

@Component({
  selector: 'rg-orchestrator',
  template: `
    <rg-page-title-provider></rg-page-title-provider>
    <rg-current-user-provider></rg-current-user-provider>
    <rg-active-games-provider></rg-active-games-provider>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class OrchestratorComponent {}
