import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { IndexComponent } from './index/index.component';
import { routes } from './routing';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [IndexComponent]
})
export class HomeModule {
}
