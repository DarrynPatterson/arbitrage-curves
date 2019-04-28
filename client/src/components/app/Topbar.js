import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import Logout from "../auth/Logout";

class Topbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authContent = (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div className="d-sm-inline-block text-right" style={{ width: "100%" }}>
          {(() => {
            if (user) {
              return (
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {user.name}
                </span>
              );
            }
          })()}

          <Logout />
        </div>
      </nav>
    );

    const guestContent = (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <div className="d-sm-inline-block text-right" style={{ width: "100%" }}>
          <LoginModal />
          <RegisterModal />
        </div>
      </nav>
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
)(Topbar);
