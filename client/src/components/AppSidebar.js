import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppSidebar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const brand = (
      <div>
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="_blank">
          <div className="sidebar-brand-icon">
            <i className="fas fa-coins"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Coin Arbitrage</div>
        </a>
        <hr className="sidebar-divider my-0" />
      </div>
    );

    const authContent = (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        {brand}
        <li className="nav-item">
          <a className="nav-link" href="#">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
      </ul>
    );

    const guestContent = (
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        {brand}
      </ul>
    );

    return <div>{isAuthenticated ? authContent : guestContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppSidebar);