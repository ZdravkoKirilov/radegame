import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state/reducers/index';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers)
    ],
    declarations: []
})
export class StateStoreModule {
}
