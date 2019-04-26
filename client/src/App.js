import React, { Component } from "react";
import AppSidebar from "./components/AppSidebar";
import AppTopbar from "./components/AppTopbar";
import ContentArea from "./components/ContentArea";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import "./css/sb-admin-2.min.css";
import "./vendor/fontawesome-free/css/all.min.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div id="wrapper">
            <AppSidebar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <AppTopbar />
                <div className="container-fluid">
                  <ContentArea />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
