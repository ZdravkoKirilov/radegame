import { Store, Action } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";
import { OutputSelector } from "reselect";

import { AppState } from "@app/core";
import { StatefulComponent, createElement, RzElementType, MetaProps } from "@app/render-kit";

import { CommonGameStore } from "../../helpers/common-selectors";

type CommonStoreSelector = OutputSelector<AppState, CommonGameStore, unknown>;

export type StoreProviderProps = {
  store: Store<AppState>;
  selectCommonGameStore: CommonStoreSelector;
};

export class StoreProvider extends StatefulComponent<StoreProviderProps> {
  constructor(props: StoreProviderProps, meta: MetaProps) {
    super(props, meta);
    this.meta.context.set('store', this.props.store);
    this.meta.context.set('selectCommonGameStore', this.props.selectCommonGameStore);
  }
  didUpdate() {
    this.meta.context.set('selectCommonGameStore', this.props.selectCommonGameStore);
  }
  render() {
    return this.props.children as any;
  }
}

type MapStateToProps<T> = (storeState: CommonGameStore, componentProps: T) => any;

export type AddedStoreProps = {
  dispatch: (action: Action) => void;
}

export const connectToStore = <OwnProps = any, StoreProps = any>(
  mapStateToProps: MapStateToProps<OwnProps>,
) =>
  (component: RzElementType<OwnProps>) => {
    type State = { fromStore?: AppState };
    type Props = OwnProps & Partial<StoreProps> & Partial<AddedStoreProps>;
    return class WithStore extends StatefulComponent<Props, State> {
      private sub: Subscription;
      state = {} as State;

      didMount() {
        const store = this.meta.context.get('store') as Store<AppState>;
        this.sub = store.pipe(
          filter<AppState>(Boolean),
          map(state => this.setState({ fromStore: state })),
        ).subscribe();
      }
      willUnmount() {
        this.sub.unsubscribe();
      }
      render() {
        const fromStore = this.state.fromStore;
        const selectCommonGameStore: CommonStoreSelector = this.meta.context.get('selectCommonGameStore');
        const commonStoreState = fromStore ? selectCommonGameStore(fromStore) : null;
        const computedProps: StoreProps = fromStore ? mapStateToProps(commonStoreState as any, this.props) : null;
        return computedProps ? createElement(
          component,
          {
            store: this.meta.context.get('store'),
            ...computedProps,
            ...this.props
          },
          [...(this.props.children || []) as any]
        ) : null;
      }
    };
  };
