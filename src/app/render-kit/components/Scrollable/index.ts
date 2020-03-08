import { StatefulComponent } from "../../bases";
import { createElement } from "../../helpers";
import { RzElementPrimitiveProps } from "app/render-kit/models";

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
    background?: number;
}>

type State = {
    xScroll?: number;
    yScroll?: number;
}

export class Scrollable extends StatefulComponent<ScrollableProps, State> {
    state: State = { xScroll: 0, yScroll: 0 };

    render() {
        const { width, height, x, y, children, borderColor, borderSize = 0,
            padding = '0 0', background = 0xffffff } = this.props;
        const { xScroll, yScroll } = this.state;
        const [paddingX, paddingY] = padding
            .split(' ')
            .map(elem => Number(elem) + borderSize)
            .filter(elem => !isNaN(elem));

        return createElement(
            'container',
            { styles: { x, y, mask: [x, y, width, height] }, name: 'OuterScroller' },
            createElement('rectangle', {
                styles: {
                    width, height, x: 0, y: 0,
                    stroke_color: borderColor, stroke_thickness: borderSize,
                    fill: background
                }
            }),
            createElement<RzElementPrimitiveProps>(
                'container',
                {
                    styles: { x: xScroll + (paddingX), y: yScroll + paddingY },
                    scrollable: {
                        yThreshold: 50,
                        xThreshold: 50,
                        maxY: `0 + ${paddingY}`,
                        minY: `(height - ${height} + (${paddingY} * 2)) * -1`,
                        minX: `width * -1`,
                        maxX: `0`,
                    },
                    onScroll: this.onChildScroll,
                    name: 'InnerScroller'
                },
                children,
            )
        );
    }

    onChildScroll = (event: { x?: number, y?: number }) => {

        if (this.props.vertical && this.props.horizontal &&
            event.y !== undefined && event.x !== undefined) {
            return this.setState({
                xScroll: event.x,
                yScroll: event.y
            });
        }

        if (this.props.vertical && event.y !== undefined) {
            return this.setState({ yScroll: event.y });
        }

        if (this.props.horizontal && event.x !== undefined) {
            return this.setState({ xScroll: event.x });
        }
    }
}