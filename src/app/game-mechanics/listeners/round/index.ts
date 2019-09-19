import { StatefulComponent } from "@app/render-kit";
import { withStore } from "../../containers/store";

class RoundListener extends StatefulComponent {
    render() {
        return null;
    }
};

export default withStore(RoundListener);