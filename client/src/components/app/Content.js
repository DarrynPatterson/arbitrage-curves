import React, { Component } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Dashboard from "../Dashboard";
import Contact from "../Contact";

class Content extends Component {

  render() {
    const selectedItem = this.props.sidebar.selectedItem;
    return (
        <div className="App">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div className="container-fluid">
                {selectedItem === 'dashboard' && <Dashboard />}
                {selectedItem === 'contact' && <Contact />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidebar: state.sidebar
});

export default connect(
  mapStateToProps,
  null
)(Content);