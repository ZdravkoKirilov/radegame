export interface StaticRedirect {
    from: number;
    to: number;
}

export interface DynamicRedirect {
    from: number;
    to: (distance: number) => number;
}
