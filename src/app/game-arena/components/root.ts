import { StatefulComponent, Component } from "@app/rendering";

type Props = {

};

type State = {

};

export class Root extends StatefulComponent<Props, State> {
    state = {
        mapped: {
            x: 100,
            y: 200,
            width: 200,
            height: 200
        },
        text: {
            mapped: {
                x: 45,
                y: 10,
            },
            value: 'Winnie',
            textStyle: {
                fontSize: 18
            }
        },
        sprite: {
            mapped: {
                x: 25,
                y: 30,
                width: '50%',
                height: '50%'
                // width: 150,
                // height: 150
            },
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2010-brown-bear.jpg/200px-2010-brown-bear.jpg'
        },

    };

    render() {
        return `
        <container name='root' mapped='{state.mapped}' draggable='{true}' onDragEnd='{props.didDrag}' >
            <sprite name="kartinka" mapped='{state.sprite.mapped}' imageSrc='{state.sprite.src}'></sprite>
            <text name='text' mapped='{state.text.mapped}' textStyle='{state.text.textStyle}'>{state.text.value}</text>
        </container>`;
    }

    didMount() {
        console.log('mount');
    }

    didDrag = (obj: Component) => {
        console.log('Dragged', obj);
    }
};