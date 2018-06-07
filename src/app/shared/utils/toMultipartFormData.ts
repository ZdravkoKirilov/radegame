export const toMultipartFormData = (data: any, nesting = 0) => {
    const formData = new FormData();
    for (let key in data) {
        const value = data[key];
        if (nesting === 0) {
            if (value instanceof Array) {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        }
        if (nesting === 1) {
            formData.append(key, value);
        }
    }
    return formData;
};

export function objectToFormData(obj: any, fd?: any, pre?: any) {
    fd = fd || new FormData()

    if (isUndefined(obj)) {
        return fd
    } else if (isArray(obj)) {
        obj.forEach(function (value: any, index: any) {
            const key = pre + `[${index}]`;
            objectToFormData(value, fd, key)
        })
    } else if (isObject(obj) && !isFile(obj) && !isDate(obj)) {
        Object.keys(obj).forEach(function (prop) {
            const value = obj[prop]

            if (isArray(value)) {
                while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
                    prop = prop.substring(0, prop.length - 2)
                }
            }

            const key = pre ? (pre + '[' + prop + ']') : prop

            objectToFormData(value, fd, key)
        })
    } else {
        fd.append(pre, obj)
    }

    return fd

    function isUndefined(value: any) {
        return value === undefined
    }

    function isObject(value: any) {
        return value === Object(value)
    }

    function isArray(value: any) {
        return Array.isArray(value)
    }

    function isFile(value: any) {
        return value instanceof File
    }

    function isDate(value: any) {
        return value instanceof Date
    }
}
