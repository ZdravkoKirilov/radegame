import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from './state-store/index';
import 'rxjs/add/operator/map';

@Component({
    selector: 'rg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>, private titleService: Title) {
        this.store.select('router')
            .map(data => data ? data.state.root.children[0].data : null)
            .subscribe(routeData => {
                routeData && this.titleService.setTitle((routeData as any).title);
            });
    }
    ngOnInit() {
        this.store
            .map(data => {
                console.log(data);
            })
            .subscribe();
    }
}
