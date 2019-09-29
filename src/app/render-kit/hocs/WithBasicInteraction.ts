import { RzElementType } from "../models";
import { StatefulComponent } from "../bases";
import { createElement } from "../helpers";

export type BasicInteractionProps = {
    hovered: boolean;
    blurred: boolean;
    pressed: boolean;
    released: boolean;
};

type State = BasicInteractionProps;

export const withBasicInteractions = <T>(component: RzElementType<T>) => {
    return class withBasicInteraction extends StatefulComponent<T, State> {
        handlerHover = () => {
            this.setState({ hovered: true, blurred: false, pressed: false, released: false });
        }
        handlerBlur = () => {
            this.setState({ hovered: false, blurred: true, pressed: false, released: false });
        }
        handlePress = () => {
            this.setState({ hovered: true, blurred: false, pressed: true, released: false });
        }
        handleRelease = () => {
            this.setState({ hovered: false, blurred: false, pressed: false, released: true });
        }

        render() {
            return createElement(
                'container',
                {
                    onPointerOver: this.handlerHover,
                    onPointerOut: this.handlerBlur,
                    onPointerDown: this.handlePress,
                    onPointerUp: this.handleRelease,
                },
                createElement(component, {
                    ...this.props,
                    ...this.state,
                }, this.props.children),
            );
        }
    };
};