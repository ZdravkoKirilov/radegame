import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from './core';
import { fadeAnimation } from './animations';
import { GetCurrentUserAction } from './profile';
import { PixiSprite, parse, BaseProps } from '@app/rendering';

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

        const markup = `
        <container name='root' mapped='{mapped}'>
            <sprite name='sprite' mapped='{sprite.mapped}'/>
            <text name='text' mapped='{text.mapped}' text='just a test'/>
            <collection name='orders' mapped='{orders.mapped}' children='{orders.children}'>
                <sprite name='{id}' mapped='{meta}'/>
            </collection>
        </container>`;

        const context = {
            mapped: {
                x: 0,
                y: 0,
            },
            sprite: {
                mapped: {
                    x: 20,
                    y: 40
                }
            },
            text: {
                mapped: {
                    x: 50,
                    y: 50
                }
            },
            orders: {
                mapped: {
                    x: 7,
                    y: 77
                },
                children: [
                    {
                        id: '11',
                        meta: {
                            x: 500,
                            y: 150
                        }
                    },
                    {
                        id: '3',
                        meta: {
                            x: 50,
                            y: 15
                        }
                    },
                ]
            },
        };

        const result = parse(markup, context);
        console.dir(result);
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
