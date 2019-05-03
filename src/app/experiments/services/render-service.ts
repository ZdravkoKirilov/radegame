import { Injectable, NgZone } from '@angular/core';

import { WindowRefService } from '@app/shared';
import { WebGLRenderer, Container, Application } from 'pixi.js';
import { createRenderer, createElement } from '@app/rendering';

import { createPixiEngine } from '@app/engines/pixi';
import { RootComponent } from '../components/root';

import * as Tween from '@tweenjs/tween.js';

@Injectable({
    providedIn: 'root'
})
export class RenderService {

    private app: Application;

    constructor(private windowRef: WindowRefService, private zone: NgZone) {
    }

    initialize(DOMElem: HTMLDivElement) {
        const width = this.windowRef.nativeWindow.innerWidth;
        const height = this.windowRef.nativeWindow.innerHeight;
        const stage = new Container();
        const window = this.windowRef.nativeWindow;

        this.app = new Application({
            width, height, transparent: true, antialias: true, resolution: 1, autoResize: true,
            backgroundColor: 0xffffff
        })

        DOMElem.appendChild(this.app.view);

        const assets = null;

        this.render(stage, assets);
        this.startRenderLoop(stage);

        window.addEventListener('resize', resize.bind(this));

        function resize() {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        }
    }

    async render(stage: Container, assets?: Set<string>) {
        const PixiEngine = createPixiEngine(this.app);
        const render = createRenderer(PixiEngine, assets || new Set());

        const component = await render(createElement(RootComponent, null), stage);
        console.log(component);
        component && component.update();
    };


    startRenderLoop(stage: Container) {
        this.zone.runOutsideAngular(() => {
            setInterval(() => {
                requestAnimationFrame(time => {
                    this.app.renderer.render(stage);
                    Tween.update(time);
                });
            });
        });

    }
}
