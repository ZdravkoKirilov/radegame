import { autoDetectRenderer, Container } from 'pixi.js';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from './core';
import { fadeAnimation } from './animations';
import { GetCurrentUserAction } from './profile';
import { PixiSprite, parse, BaseProps, createRenderer, factory, preloadAssets, createCustomFactory, createFactory } from '@app/rendering';
import { Root } from '@app/game-arena';

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

    render(stage: any) {
        const markup = `
        <container name='root' mapped='{mapped}' >
            <sprite name="kartinka" mapped='{sprite.mapped}' imageSrc='{sprite.src}'></sprite>
            <text name='text' mapped='{text.mapped}' textStyle='{text.textStyle}'>{text.value}</text>
        </container>`;

        const context = {

            mapped: {
                x: 100,
                y: 200,
                width: 200,
                height: 200
            },
            text: {
                mapped: {
                    x: 45,
                    y: 10,
                },
                value: 'Winnie',
                textStyle: {
                    fontSize: 18
                }
            },
            sprite: {
                mapped: {
                    x: 25,
                    y: 30,
                    width: 150,
                    height: 150
                },
                src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
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


        const mount = createRenderer(factory);
        //const elem = mount(markup, stage, context);
        preloadAssets(new Set(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'])).subscribe((assets) => {
            const elem = mount(markup, stage, context, {
                textures: assets
            });
        });

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

    render2(stage) {
        const customFactory = createCustomFactory({ Root });
        const mount = createRenderer(createFactory([factory, customFactory]));

        preloadAssets(new Set(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'])).subscribe((assets) => {
            const elem = mount('<Root />', stage, null, {
                textures: assets
            });
            console.dir(elem);
        });
    }

    createTestCanvas() {
        const renderer = autoDetectRenderer(1000, 500, { transparent: false, antialias: true, resolution: 1 });
        const stage = new Container();
        renderer.autoResize = true;
        this.DOMElem.nativeElement.appendChild(renderer.view);

        setInterval(() => {
            requestAnimationFrame(() => {
                renderer.render(stage);
            });
        }, 1);

        this.render2(stage);
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
