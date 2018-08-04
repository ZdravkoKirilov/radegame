import { StatefulComponent, Component, createElement } from "@app/rendering";

type Props = {
    nodes: Array<any>;
};

type State = {

};

export class NodesContainer extends StatefulComponent<Props, State> {

    render() {
        return createElement(null, null);
    }

    didMount = () => {
        console.log('Did mount from container');
    }
};