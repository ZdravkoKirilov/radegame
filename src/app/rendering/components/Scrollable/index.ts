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
}>

type State = {
    xScroll?: number;
    yScroll?: number;
}

export class Scrollable extends StatefulComponent<ScrollableProps, State> {
    state: State = { xScroll: 0, yScroll: 0 };

    render() {
        const { width, height, x, y, children, borderColor, borderSize } = this.props;
        const { xScroll, yScroll } = this.state;

        return createElement(
            'container',
            { styles: { x, y, mask: [x, y, width, height] } },
            createElement('rectangle', {
                styles: {
                    width, height, x: 0, y: 0,
                    // strokeColor: borderColor, strokeThickness: borderSize,
                    // alpha: 0
                    fill: 0xff9999
                }
            }),
            createElement(
                'container',
                {
                    styles: { x: xScroll, y: yScroll },
                    scrollable: {
                        yThreshold: 50,
                        xThreshold: 50,
                    },
                    onScroll: this.onChildScroll
                },
                children
            )
        );
    }

    onChildScroll = (newValue: { x?: number, y?: number }) => {
        if (this.props.vertical && this.props.horizontal) {
            return this.setState({
                xScroll: newValue.x,
                yScroll: newValue.y
            });
        }

        if (this.props.vertical) {
            return this.setState({ yScroll: newValue.y });
        }

        if (this.props.horizontal) {
            return this.setState({ xScroll: newValue.x });
        }
    }
}