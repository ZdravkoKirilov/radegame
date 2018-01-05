import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { autoDetectRenderer, Container, Sprite } from 'pixi.js';
import { WindowRefService } from '../../shared/services/window-ref.service';
import { SpriteComponent } from './SpriteComponent';
import { MapNode } from './Node';
import { MapLocation, MapPath } from '../models/index';
import { Path } from './Path';

@Injectable()
export class SceneRenderService {

    private renderer: any;
    private stage: Container;
    private backgroundStage: Container;
    private nodesStage: Container;
    private pathsStage: Container;
    private backgroundSprite: Sprite;
    private nodes: { [key: string]: MapNode } = {};
    private paths: { [key: string]: Path } = {};
    private initialized = false;

    public nodeMoved: Subject<MapLocation> = new Subject();
    public nodeSelected: Subject<MapLocation> = new Subject();
    public pathSelected: Subject<MapPath> = new Subject();
    public keypress: Subject<KeyboardEvent> = new Subject();

    constructor(private windowRef: WindowRefService) {
    }

    initialize(DOMElem: HTMLDivElement) {
        this.nodes = {};
        this.paths = {};
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
        this.attachKeyboardListeners(this.renderer.view);
        this.render();
        this.initialized = true;
    }

    saveElement(image: string, data: MapLocation, id: number) {
        if (this.initialized) {
            if (id in this.nodes) {
                const node = this.nodes[id];
                node.data = data;
                this.render();
            } else {
                const node = new MapNode(image, data);
                this.nodes[id] = node;
                this.attachElementEvents(node);
            }
        }
    }

    attachElementEvents(node: MapNode) {
        node.loaded.map(sprite => {
            this.nodesStage.addChild(sprite);
            this.render();
        }).subscribe();
        node.change.subscribe(() => {
            this.render();
        });
        node.moved.subscribe((loc: MapLocation) => {
            this.nodeMoved.next(loc);
        });
        node.select.subscribe((loc: MapLocation) => {
            this.nodeSelected.next(loc);
        });
    }

    removeElement(id: number) {
        if (this.initialized) {
            const node = this.nodes[id];
            if (node) {
                delete this.nodes[id];
                this.nodesStage.removeChild(node.sprite);
                this.render();
            }
        }
    }

    savePath(data: MapPath, id: number) {
        if (this.initialized) {
            const from: MapNode = this.nodes[data.fromLoc];
            const to: MapNode = this.nodes[data.toLoc];
            if (from && to && !(id in this.paths)) {
                const path = new Path(data, from, to);
                this.paths[id] = path;
                this.pathsStage.addChild(path.elem);
                this.attachPathEvents(path);
                this.render();
            } else {
                console.error('Possible bug in .savePath');
            }
        }
    }

    attachPathEvents(path: Path) {
        path.select.subscribe((data: MapPath) => {
            this.pathSelected.next(data);
        });
    }

    removePath(id) {
        if (this.initialized) {
            const path: Path = this.paths[id];
            if (path) {
                delete this.paths[id];
                this.pathsStage.removeChild(path.elem);
                this.render();
            }
        }
    }

    updateBackground(image: string) {
        if (this.initialized) {
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

    private attachKeyboardListeners(canvas: HTMLCanvasElement) {
        canvas.tabIndex = 0;
        canvas.style.outline = 'none';
        canvas.addEventListener('keydown', event => {
            event.stopPropagation();
            this.keypress.next(event);
        }, false);
    }

    private render() {
        this.renderer.render(this.stage);
    }

    private resize(width: number, height: number) {
        if (this.initialized) {
            const canvas: HTMLCanvasElement = this.renderer.view;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            this.renderer.resize(width, height);
        }
    }
}
