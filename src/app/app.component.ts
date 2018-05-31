import { autoDetectRenderer, Container } from 'pixi.js';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from './core';
import { fadeAnimation } from './animations';
import { GetCurrentUserAction } from './profile';
import { PixiSprite, parse, BaseProps, createRenderer, factory } from '@app/rendering';

@Component({
    selector: 'rg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        fadeAnimation('0.2s')
    ]
})
export class AppComponent implements OnInit {
    @ViewChild('canvasWrapper') DOMElem: ElementRef;
    constructor(private store: Store<AppState>, private titleService: Title) {
        this.store.select('router').pipe(
            map(data => data && data.state ? data.state.data : null),
        ).subscribe(routeData => {
            if (routeData) {
                this.titleService.setTitle((routeData as any).title);
            }
        })
    }

    createTestCanvas() {
        const renderer = autoDetectRenderer(1000, 500, { transparent: false, antialias: true, resolution: 1 });
        const stage = new Container();
        renderer.autoResize = true;
        this.DOMElem.nativeElement.appendChild(renderer.view);

        requestAnimationFrame(() => {
            renderer.render(stage);
        });

        const markup = `
        <container name='root' mapped='{mapped}' >
            <text name='text' mapped='{text.mapped}' textStyle='{text.textStyle}'>{text.value}</text>
        </container>`;

        const context = {

            mapped: {
                x: 100,
                y: 200,
                width: 800,
                height: 500
            },
            text: {
                mapped: {
                    x: 50,
                    y: 50,
                    width: 300,
                    height: 100,
                },
                value: 'This is a test',
                textStye: {
                    fontSize: 16
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

        const mount = createRenderer(factory);
        const elem = mount(result, stage);
        console.dir(elem);

        // const markup2 = `
        // <container name='root' dynamic='(logInput({param}, gosho))' mapped='{mapped}' logInput='{logInput}'>
        //     <sprite name='sprite' mapped='{sprite.mapped}'/>
        //     <text name='text' mapped='{text.mapped}' value='just a test'/>
        //     <collection name='orders' mapped='{orders.mapped}' children='{orders.children}' item='@order'>
        //         <collection name='nested' children='{@order.children}' item='@nestedItem'>
        //             <sprite name='{@nestedItem.id}' fromGrandParent='(logInput({param}, {@order.id}))' fromParent='{@order.id}'/>
        //         </collection>
        //     </collection>
        // </container>`;
    }
    ngOnInit() {
        this.store.subscribe(data => console.log(data));
        this.store.dispatch(new GetCurrentUserAction());
        this.createTestCanvas();
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
