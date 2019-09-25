import { Points, createElement } from '@app/render-kit';
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
        strokeThickness: props.selected ? 8 : Number(props.style.stroke_thickness),
        strokeColor: Number(props.style.stroke_color),
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
    );
    return markup;
}

export default Path;