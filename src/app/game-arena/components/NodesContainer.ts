import { StatefulComponent, Component } from "@app/rendering";

type Props = {
    nodes: Array<any>;
};

type State = {

};

export class NodesContainer extends StatefulComponent<Props, State> {

    render() {
        return `
            <collection mapped='{{"left": 0, "top": 0}}' children='{props.nodes}' item='@node'>
                <Node mapped='{@node.mapped}' sprite='{@node.sprite}' text='{@node.text}' didMount='{didMount}'/>
            </collection>
        `;
    }

    didMount = () => {
        console.log('Did mount from container');
    }
};