export class HomeMadeEventEmitter {
  private listeners: Map<any, { [eventType: string]: Set<Function> }> = new Map();

  on(eventName: string, callback: Function, context: any) {
    const existingForContext = this.listeners.get(context) || {};
    const existingCallbacksForType = existingForContext[eventName] || new Set();
    existingCallbacksForType.add(callback);
    existingForContext[eventName] = existingCallbacksForType;
    this.listeners.set(context, existingForContext);
  }

  once(eventName: string, callback: Function, context: any) {
    const self = this;
    const withUnsubscription = function () {
      callback();
      self.off(eventName, callback, context);
    };
    self.on(eventName, withUnsubscription, context);
  }

  off(eventName: string, callback?: Function, context?: any, ) {
    if (!eventName) {
      return this.listeners = new Map();
    }

    if (!context && !callback) {
      this.listeners.forEach(subscriber => {
        delete subscriber[eventName];
      });
      return [];
    }

    if (context && !callback) {
      this.listeners.delete(context);
      return;
    }

    if (callback && context) {
      const events = this.listeners.get(context) as any;
      Object.values(events).forEach((callbacks: any) => {
        callbacks.delete(callback);
      });
      return;
    }

    if (!context && callback) {
      this.listeners.forEach(events => {
        Object.values(events).forEach(callbacks => {
          callbacks.delete(callback);
        });
      });
    }
  }

  emit(eventName: string, payload: any, context?: any) {
    this.listeners.forEach(subscriber => {
      const callbacksForEvent = subscriber[eventName];
      if (callbacksForEvent) {
        callbacksForEvent.forEach(callback => callback(payload, context));
      }
    });
  }
}