import {Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ResourceEditorComponent} from './components/resource-editor/resource-editor.component';

export const routes: Routes = [
    {
        path: 'games/editor',
        component: IndexComponent,
        pathMatch: 'full',
        canActivate: []
    }, {
        path: 'games/editor/resources/:resource',
        component: ResourceEditorComponent,
        pathMatch: 'full',
        canActivate: []
    }
];
