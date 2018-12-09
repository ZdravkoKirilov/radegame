import { Lifecycles, RzElement } from "../../models";
import { StatefulComponent } from "../../mixins";
import { AssetManagerSubscription } from "../../services";

export type WithAssetProps = {
    url: string;
}

type State = {
    canLoad: boolean;
}

export class WithAsset extends StatefulComponent<WithAssetProps, State> implements Lifecycles<WithAssetProps> {
    state: State = { canLoad: true };

    sub: AssetManagerSubscription;

    render() {
        const shouldRender = !!this.meta.assets.getTexture(this.props.url) && this.state.canLoad;
        return shouldRender ? this.props.children as RzElement : null;
    }

    shouldUpdate(nextProps: WithAssetProps, nextState: State) {
        const newFile = nextProps.url !== this.props.url;
        return newFile || nextState.canLoad;
    }

    willReceiveProps(nextProps: WithAssetProps) {
        if (nextProps.url !== this.props.url) {
            this.setState({ canLoad: false });
            this.meta.assets.add(nextProps.url);
        }
    }

    didMount() {
        const file = !!this.meta.assets.getTexture(this.props.url);
        if (!file) {
            this.setState({ canLoad: false });
            this.meta.assets.add(this.props.url);
        }

        this.sub = this.meta.assets.subscribe(() => {
            if (!!this.meta.assets.getTexture(this.props.url)) {
                this.setState({ canLoad: true });
            }
        });
    }

    willUnmount() {
        this.sub.unsubscribe();
    }
}