import React, { Component } from "react";
import Content from "./components/app/Content";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Content />
      </Provider>
    );
  }
}

export default App;
