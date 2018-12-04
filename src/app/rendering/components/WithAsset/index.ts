import { Lifecycles, RzElement } from "../../models";
import { StatefulComponent } from "../../mixins";

export type WithAssetProps = {
    url: string;
}

export class WithAsset extends StatefulComponent<WithAssetProps> implements Lifecycles<WithAssetProps> {

    render() {
        const shouldRender = !!this.meta.assets.getTexture(this.props.url);
        return shouldRender ? this.props.children as RzElement : null;
    }

    shouldUpdate(nextProps: WithAssetProps) {
        const newFile = nextProps.url !== this.props.url;
        return newFile;
    }

    willReceiveProps(nextProps: WithAssetProps) {
        if (nextProps.url !== this.props.url) {
            this.meta.assets.add(nextProps.url);
        }
    }

    didMount() {
        const file = !!this.meta.assets.getTexture(this.props.url);
        if (!file) {
            this.meta.assets.add(this.props.url);
        }
    }
}