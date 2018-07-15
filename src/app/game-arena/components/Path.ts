import { Points } from '@app/rendering';

type Props = {
    mapped: any;
    points: Points;
};

export const Path = (props: Props) => `<line mapped='{props.mapped}' points='{props.points}'/>`;