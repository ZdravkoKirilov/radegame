import { Points, createElement } from '@app/rendering';

export type Props = {
    points: Points;
    polygon: Points;
    selected: boolean;
    selectPath: () => void;
};

export const Path = (props: Props) => {
    const styles = {
        strokeThickness: 2,
        strokeColor: 0xFF0000,
        alpha: 1,
    }

    const markup = createElement('fragment', null,
        createElement('line', {
            points: props.points,
            styles: styles,
            hitArea: props.polygon,
            interactive: true,
            onPointerDown: props.selectPath
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

export default Path;