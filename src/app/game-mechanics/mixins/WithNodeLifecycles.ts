import { StatefulComponent, DidUpdatePayload } from "@app/render-kit";
import { RuntimeNodeLifecycle, NODE_LIFECYCLES } from "../entities";
import { playSoundIfNeeded } from "../helpers";
import { ExpressionContext } from "../models";

type RequiredProps = {
  lifecycles: RuntimeNodeLifecycle[];
  context: ExpressionContext;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function WithNodeLifecycles(constructor: Constructor<StatefulComponent<RequiredProps>>) {
  const prototype = constructor.prototype;
  const originalDidMount = prototype.didMount;
  const originalDidUpdate = prototype.didUpdate;
  const originalwillUnmount = prototype.willUnmount;

  prototype.didMount = function () {
    const relatedLifecycles = getRelatedLifecycles(NODE_LIFECYCLES.onMount, this.props['lifecycles']);
    relatedLifecycles.forEach(doLifecycleStuffBro(this, this.props['context']));
    originalDidMount && originalDidMount.apply(this, arguments);
  }

  prototype.didUpdate = function (payload: DidUpdatePayload) {
    const relatedLifecycles = getRelatedLifecycles(NODE_LIFECYCLES.onUpdate, this.props['lifecycles']);
    relatedLifecycles.forEach(doLifecycleStuffBro(this, this.props['context'], payload));
    originalDidUpdate && originalDidUpdate.apply(this, arguments);
  }

  prototype.willUnmount = function () {
    const relatedLifecycles = getRelatedLifecycles(NODE_LIFECYCLES.onUnmount, this.props['lifecycles']);
    relatedLifecycles.forEach(doLifecycleStuffBro(this, this.props['context']));
    originalwillUnmount && originalwillUnmount.apply(this, arguments);
  }

  return constructor as typeof StatefulComponent;
}

const doLifecycleStuffBro = (component: StatefulComponent, context: ExpressionContext, payload?: DidUpdatePayload) =>
  (elem: RuntimeNodeLifecycle) => {
    elem.effect(component, payload);
    playSoundIfNeeded(elem.sound, elem.static_sound, component, context);
  };

const getRelatedLifecycles = (forType: NODE_LIFECYCLES, fromPool: RuntimeNodeLifecycle[]) =>
  fromPool?.filter((elem: RuntimeNodeLifecycle) => elem.type === forType) ?? [];