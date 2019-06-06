export function AutoClean() {

    return function (constructor) {
        const original = constructor.prototype.willUnmount;

        constructor.prototype.willUnmount = function () {
            for (let prop in this) {
                const property = this[prop];
                if (property && (typeof property.unsubscribe === "function")) {
                    property.unsubscribe();
                }
            }
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    }

}