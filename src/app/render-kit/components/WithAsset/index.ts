import { RzElement } from "../../models";
import { StatefulComponent } from "../../bases";
import { AssetManagerSubscription } from "../../services";

export type WithAssetProps = {
    url: string;
}

type State = {
    loaded: boolean;
}

export class WithAsset extends StatefulComponent<WithAssetProps, State> {
    state: State = { loaded: true };

    sub: AssetManagerSubscription;

    render() {
        const shouldRender = !!this.meta.assets.getTexture(this.props.url) && this.state.loaded;
        return shouldRender ? this.props.children : null;
    }

    shouldUpdate(nextProps: WithAssetProps, nextState: State) {
        const newFile = nextProps.url !== this.props.url;
        return newFile || nextState.loaded;
    }

    willReceiveProps(nextProps: WithAssetProps) {
        if (nextProps.url !== this.props.url) {
            this.setState({ loaded: false });
            this.meta.assets.add(nextProps.url);
        }
    }

    didMount() {
        const file = !!this.meta.assets.getTexture(this.props.url);
        const url = this.props.url;
        if (!file && url) {
            this.setState({ loaded: false });
            this.meta.assets.add(this.props.url);
        }

        if (url) {
            this.sub = this.meta.assets.subscribe(() => {
                if (!!this.meta.assets.getTexture(this.props.url)) {
                    this.setState({ loaded: true });
                }
            });
        }
    }

    willUnmount() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}