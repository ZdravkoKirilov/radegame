import { StatefulComponent } from "@app/render-kit";

type Props = {

}

type State = {

}

export class WithTransitions extends StatefulComponent<Props, State> {
    didMount() {

    }
    willUnmount() {

    }
    didUpdate() {

    }

    render() {
        return this.props.children;
    }
}