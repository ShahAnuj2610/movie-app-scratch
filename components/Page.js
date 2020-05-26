import React from 'react';
import { Provider } from 'react-redux';
import { object, bool } from 'prop-types';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from './Loader';
import configureStore from '../modules/utils/store';

let _persistor;
/**
 * Hoc to connect a nextjs page to redux store
 * @param {React.Component} Child
 * @param {(initialProps, store) => Promise} fetchBefore
 * @param {boolean} isStoreHydrationRequired Set `true`, if store hydration is required.
 *
 * Warning: SSR won't work if `isStoreHydrationRequired` set to `true`
 */
const Page = (Child, fetchBefore, isStoreHydrationRequired = false) => {
  class PageWrapper extends React.Component {
    static async getInitialProps(initProps) {
      const isServer = !!initProps.req;
      const reduxStore = configureStore(isServer);
      const { store } = reduxStore;
      let propsToBeInject;
      if (fetchBefore) {
        propsToBeInject = await fetchBefore(initProps, store);
      }
      return { initialState: store.getState(), isServer, ...propsToBeInject };
    }

    constructor(props) {
      super(props);
      const reduxStore = configureStore(props.isServer, props.initialState);
      this.store = reduxStore.store;
      _persistor = reduxStore.persistor;
    }

    render() {
      if (!_persistor) {
        if (isStoreHydrationRequired) {
          return <LoadingScreen />;
        }
        return (
          <Provider store={this.store}>
            <Child {...this.props} />
          </Provider>
        );
      }
      return (
        <PersistGate loading={<LoadingScreen />} persistor={_persistor}>
          <Provider store={this.store}>
            <Child {...this.props} />
          </Provider>
        </PersistGate>
      );
    }
  }
  PageWrapper.propTypes = {
    initialState: object,
    isServer: bool,
  };
  return PageWrapper;
};

export default Page;
