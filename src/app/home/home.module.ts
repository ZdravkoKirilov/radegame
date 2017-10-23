import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import {IndexComponent} from './index/index.component';
import {routes} from './routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DynamicFormsModule
    ],
    declarations: [IndexComponent]
})
export class HomeModule {
}
