import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {Resource} from '../../../game-mechanics/models/Resource';
import {selectResources} from '../../state/reducers/selectors';
import {AppState} from '../../../core/state/index';

@Component({
    selector: 'rg-smart-resources',
    templateUrl: './smart-resources.component.html',
    styleUrls: ['./smart-resources.component.scss']
})
export class SmartResourcesComponent implements OnInit {

    public resources: Observable<Resource[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.resources = this.store.map(state => selectResources(state));
        });
    }

}
