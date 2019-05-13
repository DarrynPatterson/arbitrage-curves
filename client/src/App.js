import React, { Component } from "react";
import Content from "./components/app/Content";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { loadUser } from "./actions/authActions";

import { PersistGate } from "redux-persist/integration/react";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Content />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
