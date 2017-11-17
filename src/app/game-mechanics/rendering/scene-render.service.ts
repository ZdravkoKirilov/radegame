import {Injectable} from '@angular/core';

import {autoDetectRenderer, Container, Sprite} from 'pixi.js';
import {WindowRefService} from '../../shared/services/window-ref.service';
import {SpriteComponent} from './SpriteComponent';
import {MapNode} from './Node';
import {MapLocation} from '../models/index';

@Injectable()
export class SceneRenderService {

    private renderer: any;
    private stage: Container;
    private backgroundStage: Container;
    private nodesStage: Container;
    private pathsStage: Container;
    private backgroundSprite: Sprite;
    private nodes: { [key: string]: MapNode };

    constructor(private windowRef: WindowRefService) {
    }

    initialize(DOMElem: HTMLDivElement) {
        this.nodes = {};
        const width = this.windowRef.nativeWindow.innerWidth;
        const height = this.windowRef.nativeWindow.innerHeight;
        this.renderer = autoDetectRenderer(width, height, {transparent: true, antialias: true, resolution: 1});
        this.renderer.autoResize = true;
        DOMElem.appendChild(this.renderer.view);

        this.stage = new Container();
        this.backgroundStage = new Container();
        this.nodesStage = new Container();
        this.pathsStage = new Container();

        this.stage.addChild(this.backgroundStage, this.pathsStage, this.nodesStage);
        this.render();
    }

    saveElement(image: string, data: MapLocation, id: number) {
        if (id in this.nodes) {
            const node = this.nodes[id];
            node.data = data;
            this.render();
        } else {
            const node = new MapNode(image, data);
            this.nodes[id] = node;
            node.loaded.map(sprite => {
                this.nodesStage.addChild(sprite);
                this.render();
            }).subscribe();
        }
    }

    removeElement(id: number) {
        const node = this.nodes[id];
        if (node) {
            delete this.nodes[id];
            this.nodesStage.removeChild(node.sprite);
            this.render();
        }
    }

    updateBackground(image: string) {
        if (this.backgroundStage) {
            if (image) {
                const background = new SpriteComponent(image);
                background.loaded.map((sprite: Sprite) => {
                    this.backgroundSprite = sprite;
                    this.backgroundStage.addChild(sprite);
                    this.resize(sprite.width, sprite.height);
                    this.render();
                }).subscribe();
            } else {
                this.resize(this.windowRef.nativeWindow.innerWidth, this.windowRef.nativeWindow.innerHeight);
                this.backgroundStage.removeChild(this.backgroundSprite);
                this.render();
            }
        }
    }

    private render() {
        this.renderer.render(this.stage);
    }

    private resize(width: number, height: number) {
        if (this.renderer) {
            const canvas: HTMLCanvasElement = this.renderer.view;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            this.renderer.resize(width, height);
        }
    }
}
