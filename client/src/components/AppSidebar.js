import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppSidebar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const brand = (
      <div>
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="javascript:void(0)">
          <div className="sidebar-brand-icon">
            <i className="fas fa-coins" />
          </div>
          <div className="sidebar-brand-text mx-3">Coin Arbitrage</div>
        </a>
        <hr className="sidebar-divider my-0" />
      </div>
    );

    return (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        {brand}
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span> Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-envelope" />
            <span> Contact</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppSidebar);
