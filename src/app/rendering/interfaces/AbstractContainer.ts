export interface AbstractContainer {
    addChild(child: any): void;
    removeChild(child: any): void;
    getChildIndex(child: any): number;
    setChildIndex(child: any, newIndex: number): void;
    addChildAt(child: any, newIndex: number): void;
    children: any[];
}