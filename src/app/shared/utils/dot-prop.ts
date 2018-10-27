export const deepProp = {
    get(obj: object, path: string, value: any): any {
        if (!isObj(obj) || typeof path !== 'string') {
            return value === undefined ? obj : value;
        }

        const pathArr = getPathSegments(path);

        for (let i = 0; i < pathArr.length; i++) {
            if (!Object.prototype.propertyIsEnumerable.call(obj, pathArr[i])) {
                return value;
            }

            obj = obj[pathArr[i]];

            if (obj === undefined || obj === null) {
                if (i !== pathArr.length - 1) {
                    return value;
                }

                break;
            }
        }

        return obj;
    },

    set(obj, path, value) {
        if (!isObj(obj) || typeof path !== 'string') {
            return obj;
        }

        const root = obj;
        const pathArr = getPathSegments(path);

        for (let i = 0; i < pathArr.length; i++) {
            const p = pathArr[i];

            if (!isObj(obj[p])) {
                obj[p] = {};
            }

            if (i === pathArr.length - 1) {
                obj[p] = value;
            }

            obj = obj[p];
        }

        return root;
    },

    delete(obj, path) {
        if (!isObj(obj) || typeof path !== 'string') {
            return;
        }

        const pathArr = getPathSegments(path);

        for (let i = 0; i < pathArr.length; i++) {
            const p = pathArr[i];

            if (i === pathArr.length - 1) {
                delete obj[p];
                return;
            }

            obj = obj[p];

            if (!isObj(obj)) {
                return;
            }
        }
    },

    has(obj, path) {
        if (!isObj(obj) || typeof path !== 'string') {
            return false;
        }

        const pathArr = getPathSegments(path);

        for (let i = 0; i < pathArr.length; i++) {
            if (isObj(obj)) {
                if (!(pathArr[i] in obj)) {
                    return false;
                }

                obj = obj[pathArr[i]];
            } else {
                return false;
            }
        }

        return true;
    }
};

function getPathSegments(path) {
    const pathArr = path.split('.');
    const parts = [];

    for (let i = 0; i < pathArr.length; i++) {
        let p = pathArr[i];

        while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
            p = p.slice(0, -1) + '.';
            p += pathArr[++i];
        }

        parts.push(p);
    }

    return parts;
}

function isObj(x: any) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
};