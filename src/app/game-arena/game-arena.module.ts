import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { routes } from './routing';
import { GameArenaRootComponent } from './pages/game-arena-root.component';

@NgModule({
  declarations: [GameArenaRootComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class GameArenaModule { }
