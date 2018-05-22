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
        <container name='root' dynamic='(logInput({param}, gosho))' mapped='{mapped}' logInput='{logInput}'>
            <sprite name='sprite' mapped='{sprite.mapped}'/>
            <text name='text' mapped='{text.mapped}'>{param}</text>
        </container>`;

        const markup2 = `
        <container name='root' dynamic='(logInput({param}, gosho))' mapped='{mapped}' logInput='{logInput}'>
            <sprite name='sprite' mapped='{sprite.mapped}'/>
            <text name='text' mapped='{text.mapped}' value='just a test'/>
            <collection name='orders' mapped='{orders.mapped}' children='{orders.children}' item='@order'>
                <collection name='nested' children='{@order.children}' item='@nestedItem'>
                    <sprite name='{@nestedItem.id}' fromGrandParent='(logInput({param}, {@order.id}))' fromParent='{@order.id}'/>
                </collection>
            </collection>
        </container>`;

        const context = {
            param: 'Pesho',
            logInput(first, second) {
                return `${first}_${second}`;
            },
            onClick() {

            },
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
                        },
                        children: [
                            {
                                id: '15'
                            }
                        ]
                    },
                    {
                        id: '3',
                        meta: {
                            x: 50,
                            y: 15
                        },
                        children: [
                            {
                                id: '16'
                            }
                        ]
                    },
                ]
            },
        };

        const result = parse({
            source: markup,
            context
        });
        console.dir(result);
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
