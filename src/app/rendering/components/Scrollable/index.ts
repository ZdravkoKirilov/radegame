import { StatefulComponent } from "../../mixins";
import { createElement } from "../../helpers";

export type ScrollableProps = Partial<{
    x: number;
    y: number;
    width: number;
    height: number;
    horizontal: boolean;
    vertical: boolean;
    borderColor?: number;
    borderSize?: number;
    padding?: string;
}>

type State = {
    xScroll?: number;
    yScroll?: number;
}

export class Scrollable extends StatefulComponent<ScrollableProps, State> {
    state: State = { xScroll: 0, yScroll: 0 };

    render() {
        const { width, height, x, y, children, borderColor, borderSize, padding } = this.props;
        const { xScroll, yScroll } = this.state;
        const [paddingX, paddingY] = (padding || '0 0')
            .split(' ')
            .map(elem => Number(elem))
            .filter(elem => !isNaN(elem));
        return createElement(
            'container',
            { styles: { x, y, mask: [x, y, width, height] } },
            createElement('rectangle', {
                styles: {
                    width, height, x: 0, y: 0,
                    strokeColor: borderColor, strokeThickness: borderSize,
                    fill: 0xff9999
                }
            }),
            createElement(
                'container',
                {
                    styles: { x: xScroll + (paddingX), y: yScroll + (paddingY) },
                    scrollable: {
                        yThreshold: 50,
                        xThreshold: 50,
                        maxY: '0',
                        minY: `(height - ${height} + (${paddingX} * 2)) * -1`
                    },
                    onScroll: this.onChildScroll
                },
                children
            )
        );
    }

    onChildScroll = (newValue: { x?: number, y?: number }) => {
        if (this.props.vertical && this.props.horizontal &&
            newValue.y !== undefined && newValue.x !== undefined) {
            return this.setState({
                xScroll: newValue.x,
                yScroll: newValue.y
            });
        }

        if (this.props.vertical && newValue.y !== undefined) {
            return this.setState({ yScroll: newValue.y });
        }

        if (this.props.horizontal && newValue.x !== undefined) {
            return this.setState({ xScroll: newValue.x });
        }
    }
}