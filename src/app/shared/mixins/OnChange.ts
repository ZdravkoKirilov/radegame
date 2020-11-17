export interface PropChange<T> {
    firstChange: boolean;
    previousValue: T;
    currentValue: T;
    isFirstChange: () => boolean;
}
export function OnChange<Context, ValueType>(callback: (context: Context, value: ValueType, simpleChange: PropChange<ValueType>) => void) {
    let _cachedValue: ValueType;
    let _isFirstChange = true;
    return (target: {}, key: PropertyKey) => {
        Object.defineProperty(target, key, {
            set: function (value) {
                // No operation if new value is same as old value
                if (!_isFirstChange && _cachedValue === value) {
                    return;
                }
                const oldValue = _cachedValue;
                _cachedValue = value;
                const simpleChange: PropChange<ValueType> = {
                    firstChange: _isFirstChange,
                    previousValue: oldValue,
                    currentValue: _cachedValue,
                    isFirstChange: () => _isFirstChange,
                };
                _isFirstChange = false;
                callback.call(this, this as Context, _cachedValue, simpleChange);
            },
            get: function () {
                return _cachedValue;
            },
        });
    };
}