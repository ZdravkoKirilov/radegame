export type BaseProps = {
    type: string;
    name: string;
    mapped: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        visible?: boolean;
        rotation?: number;
    },
    image?: string;
    temporary?: {

    },
    children?: BaseProps[]
};