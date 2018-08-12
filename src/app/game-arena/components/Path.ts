import { Points, createElement } from '@app/rendering';

type Props = {
    styles: any;
    points: Points;
    polygon: Points;
    selected: boolean;
    id: number;
    onSelect: (data: any) => void;
};

export const Path = (props: Props) => {
    const markup = createElement('fragment', { name: 'gosho' },
        createElement('line', {
            points: props.points,
            styles: props.styles,
            hitArea: props.polygon,
            interactive: true,
            id: props.id,
            onPointerDown: () => props.onSelect(props.id)
        }),
        createElement('polygon', {
            points: props.polygon,
            styles: {
                strokeThickness: 5,
                strokeColor: 0x0000cc,
                alpha: props.selected ? 1 : 0
            },
        }),
    );
    return markup;
}