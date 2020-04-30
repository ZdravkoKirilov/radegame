import { StatefulComponent, DidUpdatePayload } from "@app/render-kit";
import { RuntimeSlotLifecycle, SLOT_LIFECYCLES, ExpressionContext } from "@app/game-mechanics";

import { playSoundIfNeeded } from "@app/shared";

type RequiredProps = {
  lifecycles: RuntimeSlotLifecycle;
  context: ExpressionContext;
}

type Constructor<T = {}> = new (...args: any[]) => T;

export function WithSlotLifecycles(constructor: Constructor<StatefulComponent<RequiredProps>>) {
  const prototype = constructor.prototype;
  const originalDidMount = prototype.didMount;
  const originalDidUpdate = prototype.didUpdate;
  const originalwillUnmount = prototype.willUnmount;

  prototype.didMount = function () {
    const relatedLifecycles = getRelatedLifecycles(SLOT_LIFECYCLES.onMount, this.props['lifecycles']);
    relatedLifecycles.forEach(doLifecycleStuffBro(this, this.props['context']));
    originalDidMount && originalDidMount.apply(this, arguments);
  }

  prototype.didUpdate = function (payload: DidUpdatePayload) {
    const relatedLifecycles = getRelatedLifecycles(SLOT_LIFECYCLES.onUpdate, this.props['lifecycles']);
    relatedLifecycles.forEach(doLifecycleStuffBro(this, this.props['context'], payload));
    originalDidUpdate && originalDidUpdate.apply(this, arguments);
  }

  prototype.willUnmount = function () {
    const relatedLifecycles = getRelatedLifecycles(SLOT_LIFECYCLES.onUnmount, this.props['lifecycles']);
    relatedLifecycles.forEach(doLifecycleStuffBro(this, this.props['context']));

    this.subscriptions ?? [].forEach(sub => sub.unsubscribe());
    originalwillUnmount && originalwillUnmount.apply(this, arguments);
  }
}

const doLifecycleStuffBro = (component: StatefulComponent, context: ExpressionContext, payload?: DidUpdatePayload) =>
  (elem: RuntimeSlotLifecycle) => {
    elem.effect(component, payload);
    playSoundIfNeeded(elem.sound, elem.static_sound, component, context);
  };

const getRelatedLifecycles = (forType: SLOT_LIFECYCLES, fromPool: RuntimeSlotLifecycle[]) =>
  fromPool?.filter((elem: RuntimeSlotLifecycle) => elem.type === forType) ?? [];