import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexComponent} from './index/index.component';
import {RouterModule} from '@angular/router';
import {routes} from './routing';

import { GameElementsModule } from '../game-elements/game-elements.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        GameElementsModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [IndexComponent]
})
export class GameCreatorModule {
}
