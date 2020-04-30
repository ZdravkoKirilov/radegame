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
