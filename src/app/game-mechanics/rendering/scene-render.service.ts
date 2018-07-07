import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { autoDetectRenderer, Container, Sprite } from 'pixi.js-legacy';

import { WindowRefService } from '@app/core';
import { SpriteComponent, MapNode, Path } from './graphics';
import { MapLocation, MapPath } from '../entities';

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

    private selectedNode: number;
    private selectedPath: number;

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
        this.renderer = autoDetectRenderer(width, height, { transparent: true, antialias: true, resolution: 1 });
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

    saveElement(image: string, data: MapLocation, id: number): MapNode {
        if (this.initialized) {
            let node;
            if (id in this.nodes) {
                node = this.nodes[id];
                node.data = data;
                this.render();
            } else {
                node = new MapNode(image, data);
                this.nodes[id] = node;
                this.attachNodeEvents(node);
            }
            return node;
        }
    }

    attachNodeEvents(node: MapNode) {
        node.loaded.subscribe(sprite => {
            this.nodesStage.addChild(sprite);
            this.nodesStage.addChild(node.graphics);
            this.render();
        });
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
                this.nodesStage.removeChild(node.graphics);
                this.render();
            }
        }
    }

    savePath(data: MapPath, id: number): Path {
        if (this.initialized) {
            const from: MapNode = this.nodes[data.fromLoc];
            const to: MapNode = this.nodes[data.toLoc];
            if (from && to && !(id in this.paths)) {
                const path = new Path(data, from, to);
                this.paths[id] = path;
                this.pathsStage.addChild(path.graphics);
                this.attachPathEvents(path);
                this.render();
                return path;
            } else {
                console.error('Possible bug in .savePath');
            }
        }
    }

    attachPathEvents(path: Path) {
        path.select.subscribe((data: MapPath) => {
            this.pathSelected.next(data);
        });
        path.change.subscribe(() => {
            this.render();
        });
    }

    removePath(id) {
        if (this.initialized) {
            const path: Path = this.paths[id];
            if (path) {
                delete this.paths[id];
                this.pathsStage.removeChild(path.graphics);
                this.render();
            }
        }
    }

    updateBackground(image: string) {
        if (this.initialized) {
            if (image) {
                const background = new SpriteComponent(image);
                background.loaded.subscribe((sprite: Sprite) => {
                    this.backgroundSprite = sprite;
                    this.backgroundStage.addChild(sprite);
                    this.resize(sprite.width, sprite.height);
                    this.render();
                });
            } else {
                this.resize(this.windowRef.nativeWindow.innerWidth, this.windowRef.nativeWindow.innerHeight);
                this.backgroundStage.removeChild(this.backgroundSprite);
                this.render();
            }
        }
    }

    changeSelectedNode(id?: number, selected?: boolean) {
        if (id) {
            if (this.selectedNode !== id) {
                this.deselectNode();
                this.selectedNode = id;
            }
            if (id in this.nodes) {
                this.nodes[id].selected = selected;
                this.changeSelectedPath(null);
            }
        } else {
            this.deselectNode();
            this.selectedNode = null;
        }
    }

    deselectNode() {
        const current = this.nodes[this.selectedNode];
        if (current) {
            current.selected = false;
        }
    }

    changeSelectedPath(id?: number, selected?: boolean) {
        if (id) {
            if (this.selectedPath !== id) {
                this.deselectPath();
                this.selectedPath = id;
            }
            if (id in this.paths) {
                this.paths[id].selected = selected;
                this.changeSelectedNode(null);
            }
        } else {
            this.deselectPath();
            this.selectedPath = null;
        }
    }

    deselectPath() {
        const current = this.paths[this.selectedPath];
        if (current) {
            current.selected = false;
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
