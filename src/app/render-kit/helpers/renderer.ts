import {
    AbstractContainer, AbstractRenderEngine, Component, MetaProps, RzElement, mountComponent, createComponent,
    ContextManager, AssetManager, RzDraggable, RzScrollable
} from "../internal";

export const createRenderer = (engine: AbstractRenderEngine, resources: Set<string>, metaProps?: MetaProps) => {
    engine.factory.addCustomResolver({
        Draggable: RzDraggable,
        Scrollable: RzScrollable,
    });

    const renderFunc = (elem: RzElement, container: AbstractContainer): Promise<Component> => {
        return new Promise(async (resolve) => {
            const assetManager = new AssetManager(engine.loader);
            await assetManager.addMany(resources);
            const meta = metaProps || {} as MetaProps;
            meta.engine = engine;
            meta.context = new ContextManager();
            meta.assets = assetManager;
            meta.hooks = {
                state: new Map(),
                effect: new Map(),
                memos: new Map(),
                refs: new Map(),
            };
            const node = createComponent(elem, engine.factory, meta, null);
            meta.root = node;
            mountComponent(node, container);
            resolve(node);
        });
    }
    return renderFunc;
};