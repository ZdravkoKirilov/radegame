import { Lifecycles, RzElement } from "../../models";
import { StatefulComponent } from "../../mixins";
import { AssetManagerSubscription } from "../../services";

export type WithAssetProps = {
    url: string;
}

type State = {
    loading: boolean;
}

export class WithAsset extends StatefulComponent<WithAssetProps, State> implements Lifecycles<WithAssetProps> {
    private sub: AssetManagerSubscription;
    state = { loading: false };

    render() {
        return this.props.children as RzElement;
    }

    shouldUpdate(nextProps: WithAssetProps) {
        const newFile = nextProps.url !== this.props.url;
        const notLoading = this.state.loading !== true;

        return notLoading && newFile;
    }

    willReceiveProps(nextProps: WithAssetProps) {
        if (nextProps.url !== this.props.url) {
            this.meta.assets.add(nextProps.url);
            this.setState({ loading: true });
        }
    }

    didMount() {
        this.sub = this.meta.assets.subscribe(() => {
            if (this.meta.assets.getTexture(this.props.url)) {
                this.setState({ loading: false });
            }
        });
    }

    willUnmount() {
        this.sub.unsubscribe();
    }
}