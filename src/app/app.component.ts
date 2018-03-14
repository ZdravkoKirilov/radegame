import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { AppState } from './core/state/index';
import { fadeAnimation } from './animations';
import 'rxjs/add/operator/map';

@Component({
    selector: 'rg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        fadeAnimation('0.2s')
    ]
})
export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>, private titleService: Title) {
        this.store.select('router')
            .map(data => data && data.state ? data.state.data : null)
            .subscribe(routeData => {
                if (routeData) {
                    this.titleService.setTitle((routeData as any).title);
                }
            });
    }
    ngOnInit() {
        this.store
            .map(data => {
                console.log(data);
            })
            .subscribe();
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
