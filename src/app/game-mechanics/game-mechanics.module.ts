import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { RenderingService } from './services/rendering.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [],
    providers: [
        RenderingService
    ],
    exports: [
        RenderingService
    ]
})
export class GameMechanicsModule {
}
