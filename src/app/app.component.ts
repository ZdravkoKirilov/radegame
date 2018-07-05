import { autoDetectRenderer, Container } from 'pixi.js';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from './core';
import { fadeAnimation } from './animations';
import { GetCurrentUserAction } from './profile';
import { createRenderer, factory, preloadAssets, createCustomFactory, createFactory, createPatcher, mount, MetaProps } from '@app/rendering';
import { Root, Node, NodesContainer } from '@app/game-arena';

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

    render(stage) {
        const customFactory = createCustomFactory({ Root, Node, NodesContainer });
        const mainFactory = createFactory([factory, customFactory]);
        const render = createRenderer(mainFactory);

        preloadAssets(new Set(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'])).subscribe((assets) => {
            const meta: MetaProps = { textures: assets, containers: {} };
            const patcher = createPatcher(mount, mainFactory, meta);
            meta.patcher = patcher;
            const elem = render('<Root didDrag="{didDrag}"/>', stage, { didDrag }, meta);
            console.log(elem);
        });

        function didDrag(obj) {
            console.log('higher order  ', obj);
        }
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

        this.render(stage);
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
