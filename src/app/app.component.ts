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
        <Container name='root' mapped='{{"x": 88, "y": 99}}'>
            <Sprite name='sprite' mapped='{mapped}'/>
            <Text name='text' mapped='{mapped}'/>
            <Collection name='orders' mapped='{mapped}' children='{children}'>
                <Sprite name='sprite' mapped='{mapped}'/>
            </Collection>
        </Container>`;

        const context = {
            name: 'root',
            mapped: {
                x: 0,
                y: 0,
            },
            children: [
                {
                    name: 'sprite',
                    mapped: {
                        x: 20,
                        y: 40
                    }
                },
                {
                    name: 'text',
                    mapped: {
                        x: 50,
                        y: 50
                    }
                },
                {
                    name: 'orders',
                    mapped: {
                        x: 7,
                        y: 77
                    },
                    children: [
                        {
                            type: 'Text',
                            name: '11',
                            mapped: {
                                x: 500,
                                y: 150
                            }
                        },
                        {
                            type: 'Text',
                            name: '3',
                            mapped: {
                                x: 50,
                                y: 15
                            }
                        },
                    ]
                }
            ]

        };

        const result = parse(markup, context as BaseProps);
        console.dir(result);
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
