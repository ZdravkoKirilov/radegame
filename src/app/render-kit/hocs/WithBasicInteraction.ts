import { RzElementType } from "../models";
import { StatefulComponent } from "../bases";
import { createElement } from "../helpers";

export type BasicInteractionProps = {
    hovered: boolean;
    unhovered: boolean;
    pressed: boolean;
    released: boolean;
};

type State = BasicInteractionProps;

export const withBasicInteractions = <T>(component: RzElementType<T>) => {
    return class WithBasicInteraction extends StatefulComponent<T, State> {
        state: State = {} as State;

        handlerHover = () => {
            if (!this.state.hovered) {
                this.setState({ hovered: true, unhovered: false, pressed: false, released: false });
            }
        }
        handleUnhover = () => {
            if (!this.state.unhovered) {
                this.setState({ hovered: false, unhovered: true, pressed: false, released: false });
            }
        }
        handlePress = () => {
            if (!this.state.pressed) {
                this.setState({ hovered: true, unhovered: false, pressed: true, released: false });
            }
        }
        handleRelease = () => {
            if (!this.state.released) {
                this.setState({ hovered: false, unhovered: false, pressed: false, released: true });
            }
        }

        render() {
            return createElement(
                'container',
                {
                    onPointerOver: this.handlerHover,
                    onPointerOut: this.handleUnhover,
                    onPointerDown: this.handlePress,
                    onPointerUp: this.handleRelease,
                },
                createElement(
                    component,
                    {
                        ...this.props,
                        ...this.state,
                    },
                    [...(this.props.children || []) as any]
                ),
            );
        }
    };
};