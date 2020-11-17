export function WithTimeout(milliseconds: number = 0) {

  return function (_target: {}, _key: string, descriptor: PropertyDescriptor) {

    var originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {

      setTimeout(() => {
        originalMethod.apply(this, args);
      }, milliseconds);

    };

    return descriptor;
  }


}