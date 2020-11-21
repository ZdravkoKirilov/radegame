import { StatefulComponent, RzElementProps, MetaProps, RzElementType, createElement } from "@app/render-kit";

import { RootWidget } from "../../graphics/containers/RootWidget";

export const provideGraphics = (component: RzElementType) => {

  return class WithGraphics extends StatefulComponent {
    constructor(props: RzElementProps, meta: MetaProps) {
      super(props, meta);
      meta.engine.factory.addCustomResolver({
        'Widget': RootWidget,
      } as any)
    }

    render() {
      return createElement(component, {...this.props}, this.props.children as any);
    }
  };
};