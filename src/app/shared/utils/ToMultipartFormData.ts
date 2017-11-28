export const toMultipartFormData = (data) => {
    const formData = new FormData();
    for (let key in data) {
        const value = data[key];
        if (value instanceof Array) {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
    }
    return formData;
};
