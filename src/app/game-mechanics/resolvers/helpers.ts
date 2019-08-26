export const evaluate = (src: string, context: any): any => {
    try {
        const result = (new Function("with(this) { return " + src + "}")).call(context);
        return result !== undefined ? result : '';
    } catch (err) {
        return '';
    }
};