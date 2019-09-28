import { RzElementType } from "../models";
import { StatefulComponent } from "../bases";
import { createElement } from "../helpers";

export type BasicInteractionProps = {
    hovered: boolean;
    blur: boolean;
    pressed: boolean;
    released: boolean;
};

type State = BasicInteractionProps;

export const withBasicInteraction = <T>(component: RzElementType<T>) => {
    return class withBasicInteraction extends StatefulComponent<T, State> {
        handlerHover = () => {

        }
        handlerBlur = () => {

        }
        handlePress = () => {

        }
        handleRelease = () => {

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
                    ...this.props
                }),
            );
        }
    };
};