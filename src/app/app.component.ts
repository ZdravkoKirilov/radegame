import { autoDetectRenderer, Container } from 'pixi.js-legacy';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { fadeAnimation } from '@app/animations';
import { GetCurrentUserAction } from '@app/profile';
import { PixiEngine, createRenderer, createElement, StatefulComponent } from '@app/rendering';
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

    render(stage) {
        const assets = new Set(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg']);

        const render = createRenderer(PixiEngine, assets);
        render(createElement(Root, {}), stage).then((component: StatefulComponent<any, any>) => {
            console.log(component);
        });
    }

    createTestCanvas() {
        const renderer = autoDetectRenderer(1500, 1000, { transparent: false, antialias: true, resolution: 1 });
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
        //this.createTestCanvas();
    }

    public getRouterOutletState(outlet: any) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }
}
