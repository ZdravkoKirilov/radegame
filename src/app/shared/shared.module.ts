import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

import {NgMaterialModule} from '../ng-material/ng-material.module';
import {SliderComponent} from './components/slider/slider.component';

@NgModule({
    imports: [
        CommonModule,
        NgMaterialModule,
        FormsModule
    ],
    exports: [SliderComponent],
    declarations: [SliderComponent]
})
export class SharedModule {
}
