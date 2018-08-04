import { Points, createElement } from '@app/rendering';

type Props = {
    styles: any;
    points: Points;
};

export const Path = (props: Props) => createElement('line', { styles: props.styles, points: props.points });