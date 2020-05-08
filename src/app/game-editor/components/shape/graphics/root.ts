import { Style, BasicShapeNode, BasicShapeNodeProps, RuntimeShape } from "@app/game-mechanics";
import { StatefulComponent, createElement } from "@app/render-kit";

type Props = {
    shape: RuntimeShape;
    style: Style;
}

export default class RootComponent extends StatefulComponent<Props> {
    render() {
        const style = {
            width: 150,
            height: 150,
            stroke_thickness: 3,
            ...(this.props.style || {}),
            x: 20,
            y: 20,

        } as Style;
        const shape = this.props.shape || {} as RuntimeShape;

        return createElement<BasicShapeNodeProps>(BasicShapeNode, { style, shape });
    }
}