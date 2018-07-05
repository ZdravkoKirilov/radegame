import { StatefulComponent, Component } from "@app/rendering";

type Props = {
    mapped: any;
    text: any;
    sprite: any;
    didDrag: any;
};

type State = {

};

export class Node extends StatefulComponent<Props, State> {


    render() {
        return `
        <container name='{props.text.value}' mapped='{props.mapped}' draggable='{true}' onDragEnd='{props.didDrag}' >
            <sprite name="kartinka" mapped='{props.sprite.mapped}' imageSrc='{props.sprite.src}' relativeWidth='{400}'></sprite>
            <text name='text' mapped='{props.text.mapped}' textStyle='{props.text.textStyle}'>{props.text.value}</text>
        </container>`;
    }

    didMount() {
        console.log('mount');
    }

    didDrag = (obj: Component) => {
        console.log('Dragged', obj);
    }
};