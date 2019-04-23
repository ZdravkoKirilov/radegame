import { Points, createElement } from '@app/rendering';
import { Style } from '@app/game-mechanics';

export type Props = {
    points: Points;
    polygon: Points;
    selected: boolean;
    style: Style;
    selectPath: () => void;
};

export const Path = (props: Props) => {
    const styles = {
        strokeThickness: props.selected ? 8 : Number(props.style.strokeThickness),
        strokeColor: Number(props.style.strokeColor),
        alpha: 1,
    }

    const markup = createElement('fragment', null,
        createElement('line', {
            points: props.points,
            styles: styles,
            hitArea: props.polygon,
            onPointerDown: props.selectPath,
            button: true,
        }),
        // createElement('polygon', {
        //     points: props.polygon,
        //     styles: {
        //         strokeThickness: 5,
        //         strokeColor: 0x0000cc,
        //         alpha: props.selected ? 1 : 0
        //     },
        // }),
    );
    return markup;
}

export default Path;