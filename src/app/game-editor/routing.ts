import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SmartResourceEditorComponent } from './containers/smart-resource-editor/smart-resource-editor.component';

export const routes: Routes = [
    {
        path: 'games/editor',
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: [],
        data: {
            title: 'Radegast: create a new game'
        },
    }, {
        path: 'games/editor/resources/:resource',
        component: SmartResourceEditorComponent,
        pathMatch: 'full',
        canActivate: [],
        data: {
            title: 'Radegast: create a new resource'
        }
    }
];
