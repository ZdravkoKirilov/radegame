import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from './core';
import { fadeAnimation } from './animations';
import { GetCurrentUserAction } from './profile';
import { PixiSprite } from '@app/rendering';


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
        this.store.select('router').pipe(
            map(data => data && data.state ? data.state.data : null),
        ).subscribe(routeData => {
            if (routeData) {
                this.titleService.setTitle((routeData as any).title);
            }
        })
    }
    ngOnInit() {
        this.store.subscribe(data => console.log(data));
        this.store.dispatch(new GetCurrentUserAction());

        const sprite = new PixiSprite(null, null);
        sprite.change.subscribe(res => console.log('res'));
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
