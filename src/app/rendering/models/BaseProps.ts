export type BaseProps = {
    type: string;
    mapped: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        visible?: boolean;
        rotation?: number;
    },
    children: BaseProps[]
};