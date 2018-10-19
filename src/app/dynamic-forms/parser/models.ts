export type ParseParams = {
    source: string;
    context?: any;
    closure?: { [key: string]: any },
    removePrefix?: boolean;
};

export type BaseProps = {
    type?: string;
    children?: BaseProps[];
    template?: string;
    body?: string;
    value?: string;
    [key: string]: any;
};